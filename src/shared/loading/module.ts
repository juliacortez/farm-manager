import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// [Angular Material]
import { MatDialogModule } from '@angular/material/dialog';
// [Components]
import { LoadingComponent } from './component';

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    //[Angular Material]
    MatDialogModule,
  ],
  exports: [LoadingComponent],
})
export class LoadingModule {}
