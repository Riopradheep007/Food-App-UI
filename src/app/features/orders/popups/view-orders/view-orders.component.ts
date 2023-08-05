import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {
  orders:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
   this.orders = data.split(",");
  }

  ngOnInit(): void {
  }

}
