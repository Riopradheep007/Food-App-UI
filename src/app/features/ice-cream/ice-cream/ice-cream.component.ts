import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { FoodsService } from 'src/app/service/foods.service';
import { SignalrService } from 'src/app/service/signalr.service';

@Component({
  selector: 'app-ice-cream',
  templateUrl: './ice-cream.component.html',
  styleUrls: ['./ice-cream.component.scss']
})
export class IceCreamComponent implements OnInit {

  foods:any;
  searchKey:string ="";
  constructor(private foodApi:FoodsService,private cartService:CartService,
    private signalrService:SignalrService) {
   }

  ngOnInit(): void {
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    });
   this.getFoodData();
  }
  getFoodData() {
    this.foodApi.getfoods('icecream')
    .subscribe(data => {
      this.foods = data;
    }) 

    this.signalrService.getIceCreamData().subscribe((res)=>{
      this.foods = [];
      this.foods = res;
    });
  }
  addToCart(item: any){
    this.cartService.addtoCart(JSON.parse(JSON.stringify(item)));
  }

}
