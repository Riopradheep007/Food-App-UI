import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessSignupDeckComponent } from './business-signup-deck/business-signup-deck.component';
import { CustomersignupComponent } from './customersignup/customersignup.component'
import { LoginComponent } from './login/login.component';
import { RestaurentSignupComponent } from './restaurent-signup/restaurent-signup.component';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"customersignup",
    component:CustomersignupComponent
  },
  {
    path:"business",
    component:BusinessSignupDeckComponent
  },
  {
    path:'',
    redirectTo:'login'
  },
  {
    path:'**',
    redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
