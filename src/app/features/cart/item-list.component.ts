import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { orders } from 'src/app/models/foodDetails.model';
import { CartService } from 'src/app/service/cart.service';
import { SharedService } from 'src/app/shared/shared.service';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  public isCartEmpty:boolean = true;
  public products : any = [];
  public grandTotal !: number;
  userName:string="";
  constructor(private cartService : CartService,private matdialog:MatDialog,
    private sharedService:SharedService) { }

  ngOnInit(): void {
      this.cartService.getProducts()
      .subscribe(res=>{
        this.products = res;
      })
      this.cartService.getTotalFoodPrice().subscribe(resp => {
        this.grandTotal = resp;
        this.isCartEmpty = this.grandTotal > 0 ? false:true;
      });
      this.getUserName();
  }
  getUserName()
  {
    this.sharedService.userData.subscribe((res) =>{
        this.userName = res.name;
    })
  }
  removeFood(food: any){
    this.cartService.removeCartItem(food);
  }
  removeAllCartItems(){
    this.cartService.removeAllCart();
  }
  addFood(food: any) {
    this.cartService.addtoCart(food);
  }

  placeOrder() {
    let data = this.generateOrderDetails();
    this.cartService.orders(data).subscribe((res:any)=>{

    });
    // this.matdialog.open(OrderPlacedComponent,{
    //   width:"400px",
    //   height:"340px"
    // }).afterClosed().subscribe(res=>{
    //   this.removeAllCartItems();
    // });
  }
  generateOrderDetails()
  {
    let restaurentOrders: Map<number, [string]> = new Map();
    let restaurentOrdersTotalPrice:Map<number,number> = new Map();
    this.products.forEach((product:any)=> {
      const order = `${product.foodName} X ${product.count}`;
      if (restaurentOrders.has(product.restaurentId)) {

        restaurentOrders.get(product.restaurentId)?.push(order);
        //add restaurent total price
        let previousAmount = restaurentOrdersTotalPrice.get(product.restaurentId);
        let currentAmount = previousAmount? previousAmount + product.price: product.price;
        restaurentOrdersTotalPrice.set(product.restaurentId,currentAmount);

      } else {
        restaurentOrders.set(product.restaurentId, [order]);
        restaurentOrdersTotalPrice.set(product.restaurentId, product.price);
      }
    });

    return this.generatePayload(restaurentOrders,restaurentOrdersTotalPrice);
  }

  generatePayload(restaurentOrders:Map<number, [string]>,restaurentOrdersTotalPrice:Map<number,number>)
  {
    let result:any = [];
    restaurentOrders.forEach((orders, restaurantId) => {
      let payload = {
        name:this.userName,
        paid:restaurentOrdersTotalPrice.get(restaurantId),
        orderDetails:orders.join(","),
        restaurentId:restaurantId,
        location:"4th building anna nagar tiruppur"
      };
      result.push(payload);
    });
    return result;
  }

}
