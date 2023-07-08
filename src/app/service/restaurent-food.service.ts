import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { api_url, coreApiURL } from '../constants/api.constants';
import { RestaurentInformation } from '../models/restaurent';

@Injectable({
  providedIn: 'root'
})
export class RestaurentFoodService {

  constructor(private http:HttpClient) { }

  getRestaurentInformation(id:number)
  {
    return this.http.get<RestaurentInformation>(`${coreApiURL}${api_url.RESTAURENT_INFORMATION}?id=${id}`);
  }
    
  addFoods(data:any) {
    return this.http.post<any>(`${coreApiURL}${api_url.ADD_FOOD}`,data)
    .pipe(map((res:any) => {
          return res;
    }))
  }
  updateFood(data:any) {
    return this.http.put<any>(`${coreApiURL}${api_url.ADD_FOOD}`,data)
    .pipe(map((res:any) => {
          return res;
    }))
  }

  getAllFoods(id:number)
  {
    return this.http.get(`${coreApiURL}${api_url.RESTAURENT_GET_ALL_FOODS}?id=${id}`);
  }

  deleteFood(food:any)
  {
    return this.http.delete(`${coreApiURL}${api_url.RESTAURENT}/${food.restaurentId}/food/${food.id}?imgPath=${food.imagePath}`)
  }

  getImageAsBase64Format(url:string)
  {
    return this.http.get(url, { responseType: 'blob' });
  }
  updateRestaurentInformation(payload:RestaurentInformation)
  {
    return this.http.put(`${coreApiURL}${api_url.RESTAURENT_INFORMATION}`,payload);
  }
}
