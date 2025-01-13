import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { KpiCardComponent } from './kpi-card/kpi-card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    KpiCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    CardModule,
    TooltipModule,
    ProgressBarModule,
    ChartModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
