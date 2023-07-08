import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  public isCartEmpty:boolean = true;
  public products : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
      this.cartService.getProducts()
      .subscribe(res=>{
        this.products = res;
      })
      this.cartService.getTotalFoodPrice().subscribe(resp => {
        this.grandTotal = resp;
        this.isCartEmpty = this.grandTotal > 0 ? false:true;
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

   

}
