import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { AuthGuard, AuthService } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: '', component: TransactionsListComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
