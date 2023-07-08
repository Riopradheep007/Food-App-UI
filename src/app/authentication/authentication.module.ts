import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RestaurentSignupComponent } from './restaurent-signup/restaurent-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomersignupComponent } from './customersignup/customersignup.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { DeliveryRiderSignupComponent } from './delivery-rider-signup/delivery-rider-signup.component';
import { BusinessSignupDeckComponent } from './business-signup-deck/business-signup-deck.component';
@NgModule({
  declarations: [
    LoginComponent,
    RestaurentSignupComponent,
    CustomersignupComponent,
    HeaderComponent,
    DeliveryRiderSignupComponent,
    BusinessSignupDeckComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AuthenticationModule { }
