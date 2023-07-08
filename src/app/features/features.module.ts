import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing.module';
import { RouterModule } from '@angular/router';
import { FoodsComponent } from './foods.component';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationModule } from '../authentication/authentication.module';
@NgModule({
  declarations: [
    FoodsComponent,
    
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    RouterModule,
    SharedModule,
    AuthenticationModule
  ]
})
export class FeaturesModule { }
