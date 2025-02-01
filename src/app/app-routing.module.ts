import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// -----------------
import { LayoutCoreComponent } from 'src/project/layout';

const routes: Routes = [
  {
    path: '',
    component: LayoutCoreComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../project/modules/pages/module').then((m) => m.PagesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
