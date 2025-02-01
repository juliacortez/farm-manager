import { Routes } from '@angular/router';

import { AnimalComponent, AnimalViewComponent, FarmComponent, FarmViewComponent, HomeComponent } from './index';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'fazenda',
        component: FarmComponent,
      },
      {
        path: 'fazenda/:id',
        component: FarmViewComponent,
      },
      {
        path: 'animal',
        component: AnimalComponent,
      },
      {
        path: 'animal/:id',
        component: AnimalViewComponent,
      },
    ],
  },
];
