import { Component, OnInit } from '@angular/core';
import { FoodsService } from 'src/app/service/foods.service';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-spices',
  templateUrl: './spices.component.html',
  styleUrls: ['./spices.component.scss']
})
export class SpicesComponent implements OnInit {

  foods:any;
  searchKey:string ="";
  constructor(private foodApi:FoodsService,private cartService:CartService) {
   }

  ngOnInit(): void {
    const datas:any = this.foodApi.getfoods()
    .subscribe(data => {
      this.foods = data.filter((val:any) => {
        return val.foodType == "spices"
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
