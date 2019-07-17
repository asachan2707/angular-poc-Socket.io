import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './user/auth-guard.service';

import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductShellComponent } from './products/product-shell/product-shell.component';
import { ProductGridComponent } from './products/product-grid/product-grid.component';
import { ProductChartComponent } from './products/product-chart/product-chart.component';
import { ProductTableComponent } from './products/product-table/product-table.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'products',  component: ProductListComponent },
      { path: 'product-grid', component: ProductGridComponent },
      { path: 'product-table', component: ProductTableComponent },
      { path: 'product-chart', canActivate: [AuthGuard], component: ProductChartComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

export const ROUTING = RouterModule.forRoot(appRoutes,
  {
    useHash: true,
    enableTracing: false
  });
