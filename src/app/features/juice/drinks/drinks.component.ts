import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../service/cart.service';
import { FoodsService } from '../../../service/foods.service';
@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {


  foods:any;
  searchKey:string ="";
  constructor(private foodApi:FoodsService,private cartServ:CartService) {
   }

  ngOnInit(): void {
    const datas:any = this.foodApi.getfoods()
    .subscribe(data => {
      this.foods = data.filter((val:any)=> {
        return val.foodType == "juice"
      })
    }) 
    this.cartServ.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
}
addToCart(item: any){
  this.cartServ.addtoCart(JSON.parse(JSON.stringify(item)));
}
}
