import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitationRoutingModule } from './invitation-routing.module';
import { InvitationAcceptComponent } from './invitation-accept/invitation-accept.component';
import { ButtonModule } from 'primeng/button';
import { InvitationFormComponent } from './invitation-form/invitation-form.component';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    InvitationAcceptComponent,
    InvitationFormComponent
  ],
  imports: [
    CommonModule,
    InvitationRoutingModule,
    ReactiveFormsModule,

    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule
  ],
  exports: [
    InvitationFormComponent
  ]
})
export class InvitationModule { }
