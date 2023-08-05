import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewOrdersComponent } from './popups/view-orders/view-orders.component';
@NgModule({
  declarations: [
    OrdersComponent,
    ViewOrdersComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
