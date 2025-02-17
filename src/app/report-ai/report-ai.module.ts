import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportAiRoutingModule } from './report-ai-routing.module';
import { ReportListComponent } from './report-list/report-list.component';


@NgModule({
  declarations: [
    ReportListComponent
  ],
  imports: [
    CommonModule,
    ReportAiRoutingModule
  ]
})
export class ReportAiModule { }
