import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpicesComponent } from './spices/spices.component';

const routes: Routes = [
  {
    path:'',
    component:SpicesComponent,
  },
  {
    path:'',
    redirectTo:'spices'
  },
  {
    path:'**',
    redirectTo:'spices'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
