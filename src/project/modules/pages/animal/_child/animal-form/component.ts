import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, startWith, map } from 'rxjs';
import { FormControl, FormGroup, FormArray, Validators, NgForm, AbstractControl, FormGroupDirective, FormBuilder } from '@angular/forms';
// [Angular Material]
import { ErrorStateMatcher } from '@angular/material/core';
// [Services]
import { SnackbarService } from 'src/shared/snackbar/component';
import { FarmService } from 'src/services/farm/farm.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'animal-form',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class AnimalInputComponent implements OnInit, ErrorStateMatcher {
  @Input() animal: any;
  @Input() drawerIsOpen: any;
  @Output() formInvalid = new EventEmitter<boolean>();
  @Output() modifiedForm = new EventEmitter<boolean>();
  @Output() animalData = new EventEmitter<object>();
  @Output() setCreateType = new EventEmitter<object>();

  requestProcess: boolean = false;
  filteredFarms!: Observable<{ id: number; name: string }[]>;
  animalForm!: FormGroup;
  farms: { id: number; name: string }[] = [];
  createType: string = 'normal';

  constructor(
    private fb: FormBuilder,
    // [Services]
    private farmService: FarmService,
    private snackbarService: SnackbarService
  ) {
    this.initForm();
  }
  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    // Fills the form with the existing animal data (if available)
    if (this.animal !== undefined) {
      this.animalForm.get('name')?.setValue(this.animal.name);
      this.animalForm.get('farmId')?.setValue(this.animal.farmId);
      this.animalForm.get('tag')?.setValue(this.animal.tag);
    }

    // Listens for changes in the form and emits necessary events
    this.animalForm.valueChanges.subscribe((value) => {
      this.modifiedForm.emit(!this.animalForm.pristine);
      this.formInvalid.emit(this.animalForm.invalid);
      this.setCreateType.emit({ createType: this.createType, value: value });
      this.animalData.emit(value);
    });

    // Filters the farm options for the autocomplete field
    this.filteredFarms = this.animalForm.get('farmId')!.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterFarms(value || ''))
    );
  }

  initForm() {
    this.animalForm = this.fb.group({
      farmId: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      tag: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[0-9]*$')]],
      animals: this.fb.array([]),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.formInvalid.emit(this.animalForm.invalid);
    if (changes['drawerIsOpen']) {
      if (changes['drawerIsOpen'].previousValue === false && changes['drawerIsOpen'].currentValue === true) {
        if (this.farms.length == 0) {
          this.farmServiceIndex();
        }
      } else {
        this.animalForm.reset();
      }
    }
  }

  onAddNewAnimalInput() {
    if (this.createType === 'list') {
      const animals = this.animalForm.get('animals') as FormArray;
      animals.push(this.createAnimalGroup());
    }
  }

  createAnimalGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      tag: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[0-9]*$')]],
    });
  }

  // Updates form fields based on the selected create type ('normal' or 'list')
  onChangeCreateType(type: string) {
    if (this.createType !== type) {
      this.createType = type;
      // If 'list' is selected, removes 'name' and 'tag' fields and adds an 'animals' field
      if (this.createType === 'list') {
        const name = this.animalForm.get('name')?.value;
        const tag = this.animalForm.get('tag')?.value;
        this.animalForm.removeControl('name');
        this.animalForm.removeControl('tag');
        this.animalForm.setControl('animals', this.fb.array([this.createAnimalGroupWithValues(name, tag)]));
      } else {
        const animals = this.animalForm.get('animals') as FormArray;
        const firstAnimal = animals?.length ? animals.at(0).value : { name: '', tag: '' };
        this.animalForm.removeControl('animals');
        this.animalForm.addControl('name', new FormControl(firstAnimal.name, [Validators.required, Validators.minLength(4)]));
        this.animalForm.addControl('tag', new FormControl(firstAnimal.tag, [Validators.required, Validators.minLength(3), Validators.pattern('^[0-9]*$')]));
      }
    }
  }

  createAnimalGroupWithValues(name: string = '', tag: string = ''): FormGroup {
    return this.fb.group({
      name: [name, [Validators.required, Validators.minLength(4)]],
      tag: [tag, [Validators.required, Validators.minLength(3), Validators.pattern('^[0-9]*$')]],
    });
  }

  filterFarms(value: string) {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
    return this.farms.filter((farm) => farm.name.toLowerCase().includes(filterValue));
  }

  matcher = new MyErrorStateMatcher();

  get animals() {
    return this.animalForm.get('animals') as FormArray;
  }

  farmServiceIndex() {
    this.requestProcess = true;
    let _ = this.farmService.index();
    if (_ !== null) {
      _.subscribe(
        (response: any) => {
          this.farms = response;
          if (this.farms.length == 0) {
            this.formInvalid.emit(true);
          }
          this.requestProcess = false;
        },
        (err) => {
          this.requestProcess = false;
          var errorThrow = this.farmService.error.throw(err);
          this.snackbarService.showError(errorThrow.message, 4000);
        }
      );
    }
  }
}
