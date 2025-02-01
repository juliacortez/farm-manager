import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
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
export class FarmComponent implements OnInit {
  requestProcess: boolean = false;

  constructor(
    private router: Router,
    // [Angular Material]
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    // [Services]
    private farmService: FarmService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.farmServiceIndex();
  }

  farms: any;
  farmServiceIndex() {
    this.requestProcess = true;
    let _ = this.farmService.index();
    if (_ !== null) {
      _.subscribe(
        (response: any) => {
          this.farms = response;
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

  farmServiceWasStored(farm: any) {
    this.router.navigate(['/fazenda/' + farm.id]);
  }

  farmServiceDelete(farm: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Excluir Fazenda',
        message: 'Tem certeza que deseja excluir "' + farm.name + '"?',
        type: 'delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.requestProcess = true;
        let _ = this.farmService.delete(farm.id);
        if (_ !== null) {
          _.subscribe(
            (response: any) => {
              this.snackbarService.showSuccess('Fazenda excluída com sucesso', 4000);
              this.requestProcess = false;
              this.farmServiceIndex();
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

  createAndDownloadXLSReport() {
    const formattedData = this.farms.map((farm: { id: any; name: any; animals: string | any[] }) => ({
      'Código de cadastro': farm.id,
      'Nome da fazenda': farm.name,
      'Quantidade de animais': farm.animals.length,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fazendas Cadastradas');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(data, 'fazendas.xlsx');
  }
}
