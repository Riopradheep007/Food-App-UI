import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders:any;
  constructor() { }

  ngOnInit(): void {
    this.orders = [
     {
      orderId:32,
      date:"17 Nov,01:00 PM",
      name:"pradheep",
      paid:350,
      status:0
     },
     {
      orderId:323,
      date:"17 Nov,01:05 PM",
      name:"dhanasekar",
      paid:580,
      status:1
     },
     {
      orderId:325,
      date:"17 Nov,04:05 PM",
      name:"uthaya",
      paid:1540,
      status:2
     },
     {
      orderId:323,
      date:"17 Nov,01:05 PM",
      name:"dhanasekar",
      paid:580,
      status:1
     },
     {
      orderId:325,
      date:"17 Nov,04:05 PM",
      name:"uthaya",
      paid:1540,
      status:2
     },
     {
      orderId:323,
      date:"17 Nov,01:05 PM",
      name:"dhanasekar",
      paid:580,
      status:1
     },
     {
      orderId:325,
      date:"17 Nov,04:05 PM",
      name:"uthaya",
      paid:1540,
      status:2
     },
    ]
  }

}
