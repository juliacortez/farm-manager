import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// [Angular Material]
import { MatDialog } from '@angular/material/dialog';
// [Application Components]
import { ConfirmDialogComponent } from 'src/shared/dialogs/confirm-dialog/component';
// [Application Services]
import { AnimalService } from 'src/services/animal/animal.service';
import { SnackbarService } from 'src/shared/snackbar/component';

@Component({
  selector: 'animal-component',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class AnimalComponent implements OnInit {
  requestProcess: boolean = false;

  constructor(
    private router: Router,
    // [Shared]
    private snackbarService: SnackbarService,
    // [Angular Material]
    private dialog: MatDialog,
    //
    private animalService: AnimalService
  ) {}

  ngOnInit() {
    this.animalServiceIndex();
  }

  animals: any;
  animalServiceIndex() {
    this.requestProcess = true;
    let _ = this.animalService.index();
    if (_ !== null) {
      _.subscribe(
        (response: any) => {
          this.animals = response;
          this.requestProcess = false;
        },
        (err) => {
          this.requestProcess = false;
          var errorThrow = this.animalService.error.throw(err);
          this.snackbarService.showError(errorThrow.message, 4000);
        }
      );
    }
  }

  animalServiceWasStored(event: any) {
    if (event.createType == 'normal') {
      this.router.navigate(['/animal/' + event.data.id]);
    } else {
      this.animalServiceIndex();
    }
  }

  animalServiceDelete(animal: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Excluir Animal',
        message: 'Tem certeza que deseja excluir "' + animal.name + '"?',
        type: 'delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.requestProcess = true;
        let _ = this.animalService.delete(animal.id);
        if (_ !== null) {
          _.subscribe(
            (response: any) => {
              this.snackbarService.showSuccess('Animal excluído com sucesso', 4000);
              this.requestProcess = false;
              this.animalServiceIndex();
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

  createAndDownloadXLSReport() {
    const formattedData = this.animals.map((animal: { id: any; name: any; tag: any; farmId: any }) => ({
      'Código de cadastro': animal.id,
      'Nome do animal': animal.name,
      'Tag de identificação': animal.tag,
      'Código da fazenda': animal.farmId,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Animais Cadastrados');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(data, 'animais.xlsx');
  }
}
