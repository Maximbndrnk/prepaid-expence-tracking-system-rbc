import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { RouterModule, Routes } from '@angular/router';
import { TFiltersComponent } from './t-filters/t-filters.component';
import { TFormComponent } from './t-form/t-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'transactions',
    pathMatch: 'full'
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    TransactionsComponent,
    TFiltersComponent,
    TFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TransactionsModule {
}
