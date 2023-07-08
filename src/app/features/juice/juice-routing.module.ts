import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinksComponent } from './drinks/drinks.component';

const routes: Routes = [
  {
    path:'',
    component:DrinksComponent,
  },
  {
    path:'**',
    redirectTo:'juice'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuiceRoutingModule { }
