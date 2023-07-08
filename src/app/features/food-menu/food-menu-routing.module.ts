import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path:'menu',
    component:MenuComponent,
  },
  {
    path:'',
    redirectTo:'menu'
  },
  {
    path:'**',
    redirectTo:'menu'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodMenuRoutingModule { }
