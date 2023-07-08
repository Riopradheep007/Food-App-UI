import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { ItemListComponent } from './item-list.component';


@NgModule({
  declarations: [
    ItemListComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
