import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AutosizeModule } from 'ngx-autosize';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { WorklogsComponent } from './worklogs/worklogs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from '../components/navbar/navbar.component';

import { DropdownclickDirective } from '../directives/dropdownclick.directive';
import { LabelsComponent } from '../components/labels/labels.component';
import { AudiorecordComponent } from '../components/audiorecord/audiorecord.component';
import { LogtimerComponent } from '../components/logtimer/logtimer.component';
import { ConfigComponent } from './config/config.component';

//! Pipes
import { TruncatePipe } from '../pipes/truncate.pipe';

@NgModule({
  declarations: [
    DropdownclickDirective,
    TruncatePipe,
    PagesComponent, 
    WorklogsComponent, 
    DashboardComponent,
    NavbarComponent,
    LabelsComponent,
    AudiorecordComponent,
    LogtimerComponent,
    ConfigComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AutosizeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
