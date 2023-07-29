import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsComponent } from './foods.component';
import { AuthenticationModule } from '../authentication/authentication.module';
const routes: Routes = [
  {
    
    path:"",
    component:FoodsComponent,
    children:[
      {
        path:"foodMenu",
        loadChildren:()=>import('./food-menu/food-menu.module').then((m)=>m.FoodMenuModule)
      },
      {
        path:"cart",
        loadChildren:()=>import('./cart/cart.module').then((m)=>m.CartModule)
      },
      {
        path:"dashboard",
        loadChildren:()=>import('./dashboard/dashboard.module').then((m)=>m.DashboardModule)
      },
      {
        path:'spices',
        loadChildren: () => import('./food/food.module').then((m)=>m.FoodModule)
      },
      {
        path:'juice',
        loadChildren:() => import('./juice/juice.module').then((m)=> m.JuiceModule)
      },
      {
        path:'icecream',
        loadChildren:() => import('./ice-cream/ice-cream.module').then((m)=>m.IceCreamModule)
      },
      {
        path:'auth',
        loadChildren:() => import('../authentication/authentication.module').then((m) => m.AuthenticationModule)
      },
      {
        path:'orders',
        loadChildren:() => import('./orders/orders.module').then((m) => m.OrdersModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
