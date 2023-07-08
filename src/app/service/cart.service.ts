import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {


  public cartItemList: any = []
  public foodList:any = {};
  public productList = new BehaviorSubject<any>([]);
  public totalFoodPrice = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }
  getTotalFoodPrice() {
    return this.totalFoodPrice.asObservable();
  }
  addtoCart(product: any) {
    if(this.foodList[product.id]?false:true) {
      this.foodList[product.id] = product;
      this.foodList[product.id]['orginalPrice'] = product.price;
      this.foodList[product.id]['count'] = 1;
      this.cartItemList.push(this.foodList[product.id]);
      this.productList.next(this.cartItemList);
    }
    else{
      this.foodList[product.id]['count'] += 1;
      this.setParticularFoodPrice(product);
    }
    
    this.totalFoodPrice.next(this.getTotalPrice());
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += parseInt (a.price);
    })
    return grandTotal;
  }
  
  setParticularFoodPrice(product:any){
    for(let id of Object.keys(this.foodList)){
      if(product.id == id){
        let orginalFoodPrice =  this.foodList[product.id].orginalPrice; 
        this.foodList[product.id].price += parseInt(orginalFoodPrice);
      }
    }
  }
  
  removeFoodFromCart(product:any) {
    delete this.foodList[product.id];
    this.cartItemList = [];
  
    for (let key in this.foodList) {
      let value = this.foodList[key];
      this.cartItemList.push(value);
    }
    this.productList.next(this.cartItemList)
  }
  
  removeCartItem(product: any) {
    if(this.foodList[product.id]) {
      for(let id of Object.keys(this.foodList)){
        if(product.id == id){
          let orginalFoodPrice =  this.foodList[product.id].orginalPrice; 
          if(this.foodList[product.id].price > 0){
            this.foodList[product.id].price -= parseInt(orginalFoodPrice);
            this.foodList[product.id]['count'] -= 1;
            if( this.foodList[product.id].price == 0 ){
                this.removeFoodFromCart(product)
            }
          }
        }
        this.totalFoodPrice.next(this.getTotalPrice());
      }
    }
  }
  
  
  removeAllCart() {
    this.foodList = {}
    this.cartItemList = []
    this.productList.next(this.cartItemList);
    this.totalFoodPrice.next(this.getTotalPrice());
  }
}
