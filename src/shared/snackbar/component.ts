import { Component, Injectable, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'snackbar-component',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, duration: number = 4000) {
    this.snackBar.open(message, '', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration,
      panelClass: ['green-snackbar'],
    });
  }

  showError(message: string, duration: number = 4000) {
    this.snackBar.open(message, '', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration,
      panelClass: ['red-snackbar'],
    });
  }
}
