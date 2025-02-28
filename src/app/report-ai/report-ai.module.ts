import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportAiRoutingModule } from './report-ai-routing.module';
import { ReportListComponent } from './report-list/report-list.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    ReportListComponent
  ],
  imports: [
    CommonModule,
    ReportAiRoutingModule,

    FormsModule,
    RadioButtonModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule,
    SkeletonModule,

  ]
})
export class ReportAiModule { }
