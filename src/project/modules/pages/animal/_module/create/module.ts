import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// [Angular Material]
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// [[]]
import { AnimalInputModule } from '../../_child/animal-form/module';
// [Components]
import { AnimalCreateComponent } from './component';

@NgModule({
  declarations: [AnimalCreateComponent],
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
    AnimalInputModule,
  ],
  exports: [AnimalCreateComponent],
})
export class AnimalCreateModule {}
