import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrinksComponent } from './drinks/drinks.component';
import { JuiceRoutingModule } from './juice-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    DrinksComponent
  ],
  imports: [
    CommonModule,
    JuiceRoutingModule,
    SharedModule
  ]
})
export class JuiceModule { }
