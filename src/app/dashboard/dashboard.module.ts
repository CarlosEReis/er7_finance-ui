import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { KpiCardComponent } from './kpi-card/kpi-card.component';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { InvitationModule } from "../invitation/invitation.module";
import {SelectButtonModule} from 'primeng/selectbutton';
import {FormsModule, NgForm} from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    KpiCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,

    CardModule,
    TooltipModule,
    ProgressBarModule,
    ChartModule,
    ButtonModule,
    SkeletonModule,
    InvitationModule,
    SelectButtonModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
