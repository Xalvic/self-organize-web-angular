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
import { LogLoaderComponent } from '../components/log-loader/log-loader.component';

import { DropdownclickDirective } from '../directives/dropdownclick.directive';
import { LabelsComponent } from '../components/labels/labels.component';
import { AudiorecordComponent } from '../components/audiorecord/audiorecord.component';


@NgModule({
  declarations: [
    PagesComponent, 
    WorklogsComponent, 
    DashboardComponent,
    NavbarComponent,
    LogLoaderComponent,
    DropdownclickDirective,
    LabelsComponent,
    AudiorecordComponent,
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
