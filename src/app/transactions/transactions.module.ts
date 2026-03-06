import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

import { ButtonModule } from 'primeng/button';  
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { InvitationModule } from "../invitation/invitation.module";
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    TransactionsListComponent,
    TransactionFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TransactionsRoutingModule,
    AvatarModule,
    ButtonModule,
    TableModule,
    TagModule,
    TooltipModule,
    DialogModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    ConfirmDialogModule,
    InputTextModule,
    SkeletonModule,
    InvitationModule,
    FloatLabelModule,
    InputTextareaModule
    
],
  exports: [
    TransactionsListComponent
  ]
})
export class TransactionsModule { }
