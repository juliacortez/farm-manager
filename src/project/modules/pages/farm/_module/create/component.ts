import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// [Application Components]
import { ConfirmDialogComponent } from 'src/shared/dialogs/confirm-dialog/component';
// [Angular Material]
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
// [Application Services]
import { FarmService } from 'src/services/farm/farm.service';
import { SnackbarService } from 'src/shared/snackbar/component';

@Component({
  selector: 'farmCreateComponent',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class FarmCreateComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  @Output() farmServiceWasStored = new EventEmitter<object>();
  @Output() formInvalid = new EventEmitter<boolean>();
  @Output() modifiedForm = new EventEmitter<boolean>();
  @Output() farmData = new EventEmitter<object>();

  isFormInvalid: boolean = true;

  constructor(
    // [Angular Material]
    private dialog: MatDialog,
    // [Services]
    private farmService: FarmService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {}

  farm = {
    name: '',
  };

  farmServiceCreate() {
    if (this.isFormInvalid) {
      this.snackbarService.showError('Confira os dados do cadastro', 4000);
      return;
    } else {
      let _ = this.farmService.store(this.farm);
      if (_ !== null) {
        _.subscribe(
          (response: any) => {
            this.snackbarService.showSuccess('Fazenda cadastrada com sucesso', 4000);
            this.farmServiceWasStored.emit(response);
          },
          (err) => {
            var errorThrow = this.farmService.error.throw(err);
            this.snackbarService.showError(errorThrow.message, 4000);
          }
        );
      }
    }
  }

  onUpdateInputValue(data: any) {
    this.farm.name = data.name;
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
