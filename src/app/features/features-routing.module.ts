import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsComponent } from './foods.component';
import { AuthenticationModule } from '../authentication/authentication.module';
import { RestaurentGuard } from '../guard/restaurent.guard';
import { CustomerGuard } from '../guard/customer.guard';
const routes: Routes = [
  {
    
    path:"",
    component:FoodsComponent,
    children:[
      {
        path:"foodMenu",
        loadChildren:()=>import('./food-menu/food-menu.module').then((m)=>m.FoodMenuModule),
        canActivate:[RestaurentGuard]
      },
      {
        path:"cart",
        loadChildren:()=>import('./cart/cart.module').then((m)=>m.CartModule),
        canActivate:[CustomerGuard]
      },
      {
        path:"dashboard",
        loadChildren:()=>import('./dashboard/dashboard.module').then((m)=>m.DashboardModule),
        canActivate:[RestaurentGuard]
      },
      {
        path:'spices',
        loadChildren: () => import('./food/food.module').then((m)=>m.FoodModule),
        canActivate:[CustomerGuard]
      },
      {
        path:'juice',
        loadChildren:() => import('./juice/juice.module').then((m)=> m.JuiceModule),
        canActivate:[CustomerGuard]
      },
      {
        path:'icecream',
        loadChildren:() => import('./ice-cream/ice-cream.module').then((m)=>m.IceCreamModule),
        canActivate:[CustomerGuard]
      },
      {
        path:'auth',
        loadChildren:() => import('../authentication/authentication.module').then((m) => m.AuthenticationModule)
      },
      {
        path:'orders',
        loadChildren:() => import('./orders/orders.module').then((m) => m.OrdersModule),
        canActivate:[RestaurentGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
