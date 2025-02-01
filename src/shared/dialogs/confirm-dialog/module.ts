import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// [Angular Material]
import { MatDialogModule } from '@angular/material/dialog';
// [Components]
import { ConfirmDialogComponent } from './component';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    //[Angular Material]
    MatDialogModule,
  ],
  exports: [ConfirmDialogComponent],
})
export class ConfirmDialogModule {}
