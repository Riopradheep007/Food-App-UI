import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodRoutingModule } from './food-routing.module';
import { SpicesComponent } from './spices/spices.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    SpicesComponent,
  ],
  imports: [
    CommonModule,
    FoodRoutingModule,
    SharedModule
  ]
})
export class FoodModule { }
