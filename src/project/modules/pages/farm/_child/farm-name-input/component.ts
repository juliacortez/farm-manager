import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm, AbstractControl, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'farm-name-input',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class FarmNameInputComponent implements OnInit, ErrorStateMatcher {
  @Input() farm: any;
  @Input() drawerIsOpen: any;
  @Output() formInvalid = new EventEmitter<boolean>();
  @Output() modifiedForm = new EventEmitter<boolean>();
  @Output() farmData = new EventEmitter<object>();

  constructor() {}
  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    // Fills the form with the existing farm data (if available)
    if (this.farm !== undefined) {
      this.farmForm.get('name')?.setValue(this.farm.name);
    }

    // Listens for changes in the form and emits necessary events
    this.farmForm.valueChanges.subscribe((value) => {
      this.formInvalid.emit(this.farmForm.invalid);
      this.farmData.emit(value);
      this.modifiedForm.emit(!this.farmForm.pristine);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['drawerIsOpen']) {
      this.farmForm.reset();
      this.modifiedForm.emit(false);
    }
  }

  farmForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  matcher = new MyErrorStateMatcher();
}
