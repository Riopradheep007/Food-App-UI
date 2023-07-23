import { Component, OnInit } from '@angular/core';
import { FoodsService } from 'src/app/service/foods.service';
import { CartService } from 'src/app/service/cart.service';
import { SignalrService } from 'src/app/service/signalr.service';
@Component({
  selector: 'app-spices',
  templateUrl: './spices.component.html',
  styleUrls: ['./spices.component.scss']
})
export class SpicesComponent implements OnInit {

  foods:any;
  searchKey:string ="";
  constructor(private foodApi:FoodsService,private cartService:CartService,private signalRService:SignalrService) {
   }

  ngOnInit(): void {
    
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    });
    this.getData();
  }

  getData() {
    this.foodApi.getfoods('spices')
    .subscribe(data => {
      this.foods = data;
    }); 

    this.signalRService.getSpicesData().subscribe((res:any)=>{
      this.foods = [];
      this.foods = res;
    });
  }
  addToCart(item: any){
    this.cartService.addtoCart(JSON.parse(JSON.stringify(item)));
  }

}
