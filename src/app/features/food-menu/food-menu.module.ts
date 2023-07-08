import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FoodMenuRoutingModule } from './food-menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import { AddFoodPopupComponent } from './add-food-popup/add-food-popup.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { RestaurentInformationPopupComponent } from './restaurent-information-popup/restaurent-information-popup.component';

@NgModule({
  declarations: [
    MenuComponent,
    AddFoodPopupComponent,
    RestaurentInformationPopupComponent
  ],
  imports: [
    CommonModule,
    FoodMenuRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FoodMenuModule { }
