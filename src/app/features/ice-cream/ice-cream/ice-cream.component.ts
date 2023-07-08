import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { FoodsService } from 'src/app/service/foods.service';

@Component({
  selector: 'app-ice-cream',
  templateUrl: './ice-cream.component.html',
  styleUrls: ['./ice-cream.component.scss']
})
export class IceCreamComponent implements OnInit {

  foods:any;
  searchKey:string ="";
  constructor(private foodApi:FoodsService,private cartService:CartService) {
   }

  ngOnInit(): void {
    const datas:any = this.foodApi.getfoods()
    .subscribe(data => {
      this.foods = data.filter((val:any)=> {
        return val.foodType == "icecream"
      })
    }) 
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
   
}
addToCart(item: any){
  this.cartService.addtoCart(JSON.parse(JSON.stringify(item)));
}

}
