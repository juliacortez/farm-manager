import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// [Angular Material]
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// [Application Components]
import { ConfirmDialogComponent } from 'src/shared/dialogs/confirm-dialog/component';
// [Application Services]
import { FarmService } from 'src/services/farm/farm.service';
import { SnackbarService } from 'src/shared/snackbar/component';

@Component({
  selector: 'farm-component',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class FarmViewComponent implements OnInit {
  requestProcess: boolean = false;
  isFormInvalid: boolean = false;
  exibitionName: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // [Angular Material]
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    //
    // [Services]
    private farmService: FarmService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.farmServiceView();
  }

  farm: any;
  farmServiceView() {
    this.requestProcess = true;
    this.activatedRoute.params.subscribe((params) => {
      let _ = this.farmService.view(params['id']);
      if (_ !== null) {
        _.subscribe(
          (response: any) => {
            this.farm = response;
            this.exibitionName = this.farm.name;
            this.requestProcess = false;
          },
          (err) => {
            this.requestProcess = false;
            var errorThrow = this.farmService.error.throw(err);
            this.snackbarService.showError(errorThrow.message, 4000);
          }
        );
      }
    });
  }

  farmServiceUpdate() {
    this.requestProcess = true;
    let _ = this.farmService.update(this.farm);
    if (_ !== null) {
      _.subscribe(
        (response: any) => {
          this.farm = response;
          this.exibitionName = this.farm.name;
          this.requestProcess = false;
          this.snackbarService.showSuccess('Dados salvos com sucesso', 4000);
        },
        (err) => {
          this.requestProcess = false;
          var errorThrow = this.farmService.error.throw(err);
          this.snackbarService.showError(errorThrow.message, 4000);
        }
      );
    }
  }

  farmServiceDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Excluir Fazenda',
        message: 'Tem certeza que deseja excluir "' + this.farm.name + '"?',
        type: 'delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.requestProcess = true;
        let _ = this.farmService.delete(this.farm.id);
        if (_ !== null) {
          _.subscribe(
            (response: any) => {
              this.snackbarService.showSuccess('Fazenda excluída com sucesso', 4000);
              this.requestProcess = false;
              this.router.navigate(['/fazenda']);
            },
            (err) => {
              this.requestProcess = false;
              var errorThrow = this.farmService.error.throw(err);
              this.snackbarService.showError(errorThrow.message, 4000);
            }
          );
        }
      } else {
      }
    });
  }

  onFormInvalidChanged(isInvalid: boolean) {
    this.isFormInvalid = isInvalid;
  }

  onUpdateInputValue(data: any) {
    this.farm.name = data.name;
  }
}
