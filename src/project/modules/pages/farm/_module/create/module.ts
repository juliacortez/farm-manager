import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// [Angular Material]
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// [[]]
import { FarmNameInputModule } from '../../_child/farm-name-input/module';
// [Components]
import { FarmCreateComponent } from './component';

@NgModule({
  declarations: [FarmCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //[Angular Material]
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    // [[]]
    FarmNameInputModule,
  ],
  exports: [FarmCreateComponent],
})
export class FarmCreateModule {}
