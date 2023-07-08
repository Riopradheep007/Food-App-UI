import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';

const routes: Routes = [
  {
    path:'',
    component:DashComponent,
  },
  {
    path:'',
    redirectTo:'dash'
  },
  {
    path:'**',
    redirectTo:'dash'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
