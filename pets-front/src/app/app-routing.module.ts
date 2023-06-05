import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components/page-not-found.component';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('../login/login.module').then((m) => m.LoginModule),
  },
  {
    path:'transactions',
    loadChildren: () => import('../transactions/transactions.module').then((m) => m.TransactionsModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
