import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { api_url, coreApiURL } from '../constants/api.constants';
@Injectable({
  providedIn: 'root'
})
export class FoodsService {
  public foodItemList: any = []
  public foodList = new BehaviorSubject<any>([]);
  constructor(private http:HttpClient) { }
  getfoods() {
    return this.http.get<any>(coreApiURL)
    .pipe(map((res:any) => {
     return res; 
    }))
  }
  
  displayAddedFood() {
    return this.foodList.asObservable();
  }
  clickToAddFood(product: any) {
    this.foodItemList.push(product);
    this.foodList.next(this.foodItemList);
  
  }

  
  addFoods(data:any) {
    return this.http.post<any>(`${coreApiURL}${api_url.ADD_FOOD}`,data)
    .pipe(map((res:any) => {
          return res;
    }))
  }

  updateFoods(data:any,id:number) {
   return this.http.put<any>(coreApiURL+'/'+id,data)
   .pipe(map((res:any) => {
         return res;
   }))
  }
  
  deleteFoods(id:number) {
   return this.http.delete<any>(coreApiURL+'/'+id)
   .pipe(map((res:any) => {
         return res;
   }))
  }
}
