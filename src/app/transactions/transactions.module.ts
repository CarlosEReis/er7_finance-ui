import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    TransactionsListComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,

    ButtonModule,
    TableModule,
    TagModule,
    TooltipModule
  ],
  exports: [
    TransactionsListComponent
  ]
})
export class TransactionsModule { }
