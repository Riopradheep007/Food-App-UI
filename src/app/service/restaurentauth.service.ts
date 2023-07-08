import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Subject,observable, Observable } from 'rxjs';
import { api_url, coreApiURL } from '../constants/api.constants';
import { RestaruentSignup } from '../models/restaurentsignup.model';
@Injectable({
  providedIn: 'root'
})
export class RestaurentauthService {
  RestaurentStorageData:any;
  userLoginId:any = "";
  private  isValidUser = new Subject<boolean>();
  private  baseUrl = coreApiURL+"Restaurents";
  constructor(private http: HttpClient) {

   }
   
   getDataFromLocalStorage() {
    this.RestaurentStorageData = localStorage.getItem('restaurentLogin')
    this.isValidUser.next(JSON.parse(this.RestaurentStorageData))
  }

  sendSubjectResponse():Observable<boolean> {
     return this.isValidUser.asObservable(); 
  }

   getUserData() {
     return this.http.get<any>(this.baseUrl)
     .pipe(map((res:any) => {
      return res; 
     }))
   }
 
   getUserDataById() {
    return this.http.get(this.baseUrl+'/'+this.userLoginId)
    .pipe(map((res:any) => {
      return res;
    }))

  }
   
   AddUserData(data:RestaruentSignup) {
     return this.http.post<any>(`${coreApiURL}${api_url.RESTAURENT_SIGNUP}`,data)
     .pipe(map((res:any) => {
           return res;
     }))
   }

   updateUserData(data:any,id:number) {
    return this.http.put<any>(this.baseUrl+id,data)
    .pipe(map((res:any) => {
          return res;
    }))
   }
   
   delteUserData(id:number) {
    return this.http.delete<any>(this.baseUrl+id)
    .pipe(map((res:any) => {
          return res;
    }))
   }

   getLoginUserID(id:number) {
      this.userLoginId = id;
   }

   returnLoginUserId() {
     return this.userLoginId;
   }
 

}


