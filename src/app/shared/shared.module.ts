import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/module/material.module';
import { FilterPipe } from './pipes/filter.pipe';
import { DashboardCardsComponent } from './Components/dashboard-cards/dashboard-cards.component';
import { DeleteComponent } from './popup/delete/delete/delete.component';
import { OrderPlacedComponent } from './popup/order-placed/order-placed.component';

@NgModule({
  declarations: [FilterPipe, DashboardCardsComponent, DeleteComponent, OrderPlacedComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MaterialModule,
    FilterPipe,
    DashboardCardsComponent
  ]
})
export class SharedModule { }
