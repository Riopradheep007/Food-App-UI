import { Component, OnInit } from '@angular/core';
import { ordersDetails } from 'src/app/models/restaurent';
import { RestaurentFoodService } from 'src/app/service/restaurent-food.service';
import { SharedService } from 'src/app/shared/shared.service';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
  orders:any;
  restaurentId:number = 0;
  constructor(private restaurentService:RestaurentFoodService, private sharedService:SharedService ) { }

  ngOnInit(): void {
    this.getUserID();
    this.restaurentService.getOrders(this.restaurentId).subscribe((res:any) =>{
      this.pendingOrdersCount(res);
      this.orders = res;
    });
    // this.orders = [
    //  {
    //   orderId:32,
    //   date:"17 Nov,01:00 PM",
    //   name:"pradheep",
    //   paid:350,
    //   status:0
    //  },
    //  {
    //   orderId:323,
    //   date:"17 Nov,01:05 PM",
    //   name:"dhanasekar",
    //   paid:580,
    //   status:1
    //  },
    //  {
    //   orderId:325,
    //   date:"17 Nov,04:05 PM",
    //   name:"uthaya",
    //   paid:1540,
    //   status:2
    //  },
    //  {
    //   orderId:323,
    //   date:"17 Nov,01:05 PM",
    //   name:"dhanasekar",
    //   paid:580,
    //   status:1
    //  },
    //  {
    //   orderId:325,
    //   date:"17 Nov,04:05 PM",
    //   name:"uthaya",
    //   paid:1540,
    //   status:2
    //  },
    //  {
    //   orderId:323,
    //   date:"17 Nov,01:05 PM",
    //   name:"dhanasekar",
    //   paid:580,
    //   status:1
    //  },
    //  {
    //   orderId:325,
    //   date:"17 Nov,04:05 PM",
    //   name:"uthaya",
    //   paid:1540,
    //   status:2
    //  },
    // ]
  }

  getUserID()
  {
     this.sharedService.userData.subscribe((res) =>{
      this.restaurentId = res.id;
    });
  }
  updateStatus(order:ordersDetails,status:number)
  {
    let payload = {
      orderId:order.orderId,
      restaurentId:order.restaurentId,
      status:status
    }
    this.restaurentService.updateOrderStatus(payload).subscribe((res:any)=>{
      this.orders = [];
      this.orders = res;
      this.pendingOrdersCount(res);
    });
  }

  pendingOrdersCount(data:any)
  {
    let count = 0;
    data.forEach((val:any) => {
      if(val.status == 0)
      {
        count += 1;
      }
    });
    this.restaurentService.pendingOrdersCount.next(count);
  }

}
