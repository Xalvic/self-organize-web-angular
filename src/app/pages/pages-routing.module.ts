import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorklogsComponent } from './worklogs/worklogs.component';
import { ConfigComponent } from './config/config.component';

const routes: Routes = [
  { 
    path: '', 
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { animationState: 'One' }
      },
      {
        path: 'worklogs',
        component: WorklogsComponent,
        data: { animationState: 'Two' }
      },
      {
        path: 'config',
        component: ConfigComponent,
        data: { animationState: 'Three' }
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: DashboardComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
