import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ordersDetails } from 'src/app/models/restaurent';
import { RestaurentFoodService } from 'src/app/service/restaurent-food.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ViewOrdersComponent } from './popups/view-orders/view-orders.component';
import { SignalrService } from 'src/app/service/signalr.service';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
  orders:any;
  restaurentId:number = 0;
  constructor(private restaurentService:RestaurentFoodService, private dialog: MatDialog,
    private sharedService:SharedService,private signalrService:SignalrService ) { }

  ngOnInit(): void {
    this.getUserID();
    this.getCustomerOrders();
  }
  
  getCustomerOrders()
  {
    this.restaurentService.getOrders(this.restaurentId).subscribe((res:any) =>{
      this.pendingOrdersCount(res);
      this.orders = res;
    });
    this.signalrService.getCustomerOrders().subscribe((res:any)=>{
      if(res){
        this.orders = [];
        this.pendingOrdersCount(res);
        this.orders = res;
      }
    })
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

  viewOrders(orders:string)
  {
    this.dialog.open(ViewOrdersComponent,{
      width: "400px",
      disableClose: true,
      autoFocus:false,
      panelClass: 'myapp-no-padding-dialog',
      data:orders
    });
  }

}
