import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// [Angular Material]
import { MatDialog } from '@angular/material/dialog';
// [Application Components]
import { ConfirmDialogComponent } from 'src/shared/dialogs/confirm-dialog/component';
// [Application Services]
import { AnimalService } from 'src/services/animal/animal.service';
import { SnackbarService } from 'src/shared/snackbar/component';

@Component({
  selector: 'farm-component',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class AnimalViewComponent implements OnInit {
  requestProcess: boolean = false;
  isFormInvalid: boolean = false;
  exibitionName: string = '';

  constructor(
    private router: Router,
    // [Angular Material]
    private dialog: MatDialog,
    //
    private activatedRoute: ActivatedRoute,
    private animalService: AnimalService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.animalServiceView();
  }

  animal: any;
  animalServiceView() {
    this.requestProcess = true;
    this.activatedRoute.params.subscribe((params) => {
      let _ = this.animalService.view(params['id']);
      if (_ !== null) {
        _.subscribe(
          (response: any) => {
            this.requestProcess = false;
            this.animal = response;
            this.exibitionName = this.animal.name;
          },
          (err) => {
            this.requestProcess = false;
            var errorThrow = this.animalService.error.throw(err);
            this.snackbarService.showError(errorThrow.message, 4000);
          }
        );
      }
    });
  }

  animalServiceUpdate() {
    this.requestProcess = true;
    let _ = this.animalService.update(this.animal);
    if (_ !== null) {
      _.subscribe(
        (response: any) => {
          this.animal = response;
          this.exibitionName = this.animal.name;
          this.requestProcess = false;
          this.snackbarService.showSuccess('Dados salvos com sucesso', 4000);
        },
        (err) => {
          this.requestProcess = false;
          var errorThrow = this.animalService.error.throw(err);
          this.snackbarService.showError(errorThrow.message, 4000);
        }
      );
    }
  }

  animalServiceDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Excluir Animal',
        message: 'Tem certeza que deseja excluir "' + this.animal.name + '"?',
        type: 'delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.requestProcess = true;
        let _ = this.animalService.delete(this.animal.id);
        if (_ !== null) {
          _.subscribe(
            (response: any) => {
              this.snackbarService.showSuccess('Animal excluído com sucesso', 4000);
              this.requestProcess = false;
              this.router.navigate(['/animal']);
            },
            (err) => {
              this.requestProcess = false;
              var errorThrow = this.animalService.error.throw(err);
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
    this.animal.farmId = data.farmId;
    this.animal.name = data.name;
    this.animal.tag = data.tag;
  }
}
