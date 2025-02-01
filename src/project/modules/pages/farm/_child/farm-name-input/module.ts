import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// [Angular Material]
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
// [Components]
import { FarmNameInputComponent } from './component';

@NgModule({
  declarations: [FarmNameInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //[Angular Material]
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [FarmNameInputComponent],
})
export class FarmNameInputModule {}
