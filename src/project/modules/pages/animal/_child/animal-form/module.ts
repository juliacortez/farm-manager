import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// [Application Components]
import { ConfirmDialogComponent } from 'src/shared/dialogs/confirm-dialog/component';
// [Shared/Loading]
import { LoadingModule } from 'src/shared/loading/module';
// [Angular Material]
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// [Components]
import { AnimalInputComponent } from './component';

@NgModule({
  declarations: [AnimalInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // [Shared]
    LoadingModule,
    //[Angular Material]
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
  ],
  exports: [AnimalInputComponent],
})
export class AnimalInputModule {}
