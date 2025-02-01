import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// [[Rotas da Aplicação]]
import { PagesRoutes } from './routing';
// [Shared/Dialog]
import { ConfirmDialogModule } from 'src/shared/dialogs/confirm-dialog/module';
// [Shared/Loading]
import { LoadingModule } from 'src/shared/loading/module';
// [Angular Material]
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
// [Layout]
import { AnimalComponent, FarmComponent, FarmViewComponent, AnimalViewComponent, HomeComponent } from './index';
import { RouterModule } from '@angular/router';
// [Farm]
import { FarmCreateModule } from './farm/_module/create/module';
import { FarmNameInputModule } from './farm/_child/farm-name-input/module';
// [Animal]
import { AnimalCreateModule } from './animal/_module/create/module';
import { AnimalInputModule } from './animal/_child/animal-form/module';
// [Services]
import { AnimalService } from 'src/services/animal/animal.service';
import { FarmService } from 'src/services/farm/farm.service';
import { ErrorService } from 'src/services/error.service';
import { SnackbarService } from 'src/shared/snackbar/component';

@NgModule({
  declarations: [
    // [Pages]
    // [Animal]
    AnimalComponent,
    AnimalViewComponent,
    // [Farm]
    FarmComponent,
    FarmViewComponent,
    //
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PagesRoutes),
    // [Shared/Dialog]
    ConfirmDialogModule,
    // [Shared/Loading],
    LoadingModule,

    //[Angular Material]
    MatSnackBarModule,
    MatTableModule,
    MatSidenavModule,
    MatTabsModule,
    MatInputModule,
    // [Farm]
    FarmCreateModule,
    FarmNameInputModule,
    // [Animal]
    AnimalCreateModule,
    AnimalInputModule,
  ],
  providers: [AnimalService, FarmService, ErrorService],
})
export class PagesModule {}
