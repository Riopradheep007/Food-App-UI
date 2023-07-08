import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IceCreamComponent } from './ice-cream/ice-cream.component';

const routes: Routes = [
  {
    path:'',
    component:IceCreamComponent,
  },
  {
    path:'',
    redirectTo:'icecream'
  },
  {
    path:'**',
    redirectTo:'iceCream'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IceCreamRoutingModule { }
