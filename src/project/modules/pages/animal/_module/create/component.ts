import { Component, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
// [Application Components]
import { ConfirmDialogComponent } from 'src/shared/dialogs/confirm-dialog/component';
// [Angular Material]
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
// [Services]
import { AnimalService } from 'src/services/animal/animal.service';
import { SnackbarService } from 'src/shared/snackbar/component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'animal-create',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class AnimalCreateComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  @Output() animalServiceWasStored = new EventEmitter<object>();
  @Output() formInvalid = new EventEmitter<boolean>();
  @Output() animalData = new EventEmitter<object>();

  modifiedForm: boolean = false;
  animalList: { name: string; tag: string }[] = [];
  farmId: number | null = null;
  isFormInvalid: boolean = false;
  createType: string = '';

  constructor(
    private route: ActivatedRoute,
    // [Angular Material]
    private dialog: MatDialog,
    // [Services]
    private animalService: AnimalService,
    private snackbarService: SnackbarService
  ) {}
  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['openDrawer'] === 'true' && this.drawer) {
        setTimeout(() => this.drawer.open());
      }
    });
  }

  ngOnInit() {}

  animal: any;
  animalServiceCreate() {
    if (this.isFormInvalid) {
      this.snackbarService.showError('Confira os dados do cadastro', 4000);
    } else {
      let _ = this.animalService.store(this.animal);
      if (_ !== null) {
        _.subscribe(
          (response: any) => {
            this.snackbarService.showSuccess('Animal cadastrado com sucesso', 4000);
            this.animalServiceWasStored.emit({ createType: this.createType, data: response });
          },
          (err) => {
            var errorThrow = this.animalService.error.throw(err);
            this.snackbarService.showError(errorThrow.message, 4000);
          }
        );
      }
    }
  }

  animalServiceListCreate() {
    if (this.isFormInvalid) {
      this.snackbarService.showError('Confira os dados do cadastro', 4000);
      return;
    } else {
      let _ = this.animalService.list(this.animal);
      if (_ !== null) {
        _.subscribe(
          (response: any) => {
            this.snackbarService.showSuccess('Animal cadastrado com sucesso', 4000);
            this.animalServiceWasStored.emit({ createType: this.createType, data: response });
            this.drawer.close();
          },
          (err) => {
            var errorThrow = this.animalService.error.throw(err);
            this.snackbarService.showError(errorThrow.message, 4000);
          }
        );
      }
    }
  }

  onUpdateInputValue(data: { farmId: string; name?: string; tag?: string; animals?: any[] }) {
    if (this.createType == 'normal') {
      this.animal = {
        farmId: data.farmId,
        name: data.name,
        tag: data.tag,
      };
    } else if (this.createType === 'list') {
      this.animal = {
        animals: data.animals,
        farmId: data.farmId,
      };
    }
  }

  onSetCreateType(event: any) {
    this.createType = event.createType;
    this.onUpdateInputValue(event.value);
  }

  onCreateClick() {
    if (this.createType === 'normal') {
      this.animalServiceCreate();
    } else if (this.createType === 'list') {
      this.animalServiceListCreate();
    }
  }

  onFormInvalidChanged(isInvalid: boolean) {
    this.isFormInvalid = isInvalid;
  }

  onCheckIfFormWasModified(data: any) {
    this.modifiedForm = data;
  }

  //Shows a confirm modal if the form was changed and the drawer is being closed
  onToggleDrawer() {
    if (this.drawer.opened) {
      if (this.modifiedForm) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '400px',
          data: {
            title: 'Você tem alterações não salvas',
            message: 'Tem certeza que deseja sair? Se continuar, as informações não serão salvas.',
            type: 'close',
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.drawer.close();
          }
        });
      } else {
        this.drawer.close();
      }
    } else {
      this.drawer.open();
    }
  }
}
