import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitationAcceptComponent } from './invitation-accept/invitation-accept.component';

const routes: Routes = [
  { path: ':invitationToken/accept', component: InvitationAcceptComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitationRoutingModule { }
