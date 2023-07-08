import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IceCreamRoutingModule } from './ice-cream-routing.module';
import { IceCreamComponent } from './ice-cream/ice-cream.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    IceCreamComponent,
  ],
  imports: [
    CommonModule,
    IceCreamRoutingModule,
    SharedModule
  ]
})
export class IceCreamModule { }
