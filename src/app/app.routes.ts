import { Routes } from '@angular/router';
import { ROUTES } from './core/constants/routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTES.APP.PRODUCTS_LIST.PATH,
  },
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      {
        path: ROUTES.APP.PRODUCTS_LIST.PATH,
        loadComponent: () =>
          import('./features/products-list/components/products-list.component').then((m) => m.ProductsListComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: ROUTES.APP.PRODUCTS_LIST.PATH,
  },
];
