import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule), canActivate: [ AuthGuard ]},
  { path: 'transactions', loadChildren: () => import('./transactions/transactions.module').then( m => m.TransactionsModule), canActivate: [ AuthGuard ] },
  { path: 'reports-ai', loadChildren: () => import('./report-ai/report-ai.module').then( m => m.ReportAiModule), canActivate: [ AuthGuard ] },
  { path: 'subscriptions', loadChildren: () => import('./subscriptions/subscriptions.module').then( m => m.SubscriptionsModule), canActivate: [ AuthGuard ] },
  { path: 'auth/login', loadChildren: () => import("./security/security.module").then((m) => m.SecurityModule), },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
