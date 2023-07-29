import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { api_url, coreApiURL } from '../constants/api.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  public cartItemList: any = []
  public foodList:any = {};
  public productList = new BehaviorSubject<any>([]);
  public totalFoodPrice = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(private http:HttpClient) { }

  getProducts() {
    return this.productList.asObservable();
  }
  getTotalFoodPrice() {
    return this.totalFoodPrice.asObservable();
  }
  addtoCart(product: any) {
    if(this.foodList[product.foodId]?false:true) {
      this.foodList[product.foodId] = product;
      this.foodList[product.foodId]['orginalPrice'] = product.price;
      this.foodList[product.foodId]['count'] = 1;
      this.cartItemList.push(this.foodList[product.foodId]);
      this.productList.next(this.cartItemList);
    }
    else{
      this.foodList[product.foodId]['count'] += 1;
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
      if(product.foodId == id){
        let orginalFoodPrice =  this.foodList[product.foodId].orginalPrice; 
        this.foodList[product.foodId].price += parseInt(orginalFoodPrice);
      }
    }
  }
  
  removeFoodFromCart(product:any) {
    delete this.foodList[product.foodId];
    this.cartItemList = [];
  
    for (let key in this.foodList) {
      let value = this.foodList[key];
      this.cartItemList.push(value);
    }
    this.productList.next(this.cartItemList)
  }
  
  removeCartItem(product: any) {
    if(this.foodList[product.foodId]) {
      for(let id of Object.keys(this.foodList)){
        if(product.foodId == id){
          let orginalFoodPrice =  this.foodList[product.foodId].orginalPrice; 
          if(this.foodList[product.foodId].price > 0){
            this.foodList[product.foodId].price -= parseInt(orginalFoodPrice);
            this.foodList[product.foodId]['count'] -= 1;
            if( this.foodList[product.foodId].price == 0 ){
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

  orders(data:any) {
    return this.http.post(`${coreApiURL}${api_url.ORDERS}`,data);
  }
}
