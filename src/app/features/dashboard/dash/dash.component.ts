import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  widgets:any;
  constructor() { }

  ngOnInit(): void {
    this.widgets = [
    {
     "title":"Customers",
      "icon":"person",
      "count":25
    },
    {
      "title":"Revenue",
       "icon":"euro",
       "count":10000
     },
     {
      "title":"Pending Orders",
       "icon":"delivery_dining",
       "count":2
     },
     {
      "title":"Deliverd Orders",
       "icon":"check_circle",
       "count":5
     },
  ]
  }
  
  


}
