import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../service/cart.service';
import { FoodsService } from '../../../service/foods.service';
import { SignalrService } from 'src/app/service/signalr.service';
@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {


  foods:any;
  searchKey:string ="";
  constructor(private foodApi:FoodsService,private cartServ:CartService,private signalrService:SignalrService) {
   }

  ngOnInit(): void {
    this.cartServ.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
    this.getFoodData();
  }

  getFoodData() {
    this.foodApi.getfoods('juice')
    .subscribe(data => {
      this.foods = data;
    });
    this.signalrService.getJuiceData().subscribe((res)=>{
      this.foods = [];
      this.foods = res;
    });
  }
  addToCart(item: any){
    this.cartServ.addtoCart(JSON.parse(JSON.stringify(item)));
  }
}
