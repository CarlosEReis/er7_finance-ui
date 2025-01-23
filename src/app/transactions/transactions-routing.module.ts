import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { AuthGuard, AuthService } from '@auth0/auth0-angular';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

const routes: Routes = [
  { path: '', component: TransactionsListComponent, canActivate: [ AuthGuard ], children: [
    { path: 'new', component: TransactionFormComponent, canActivate: [ AuthGuard ] },
    { path: 'edit/:id', component: TransactionFormComponent, canActivate: [ AuthGuard ] }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
