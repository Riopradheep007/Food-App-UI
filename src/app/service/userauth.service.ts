import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Subject,observable, Observable } from 'rxjs';
import { customerLogin } from '../models/login.models';
import { api_url, coreApiURL } from '../constants/api.constants';
@Injectable({
  providedIn: 'root'
})
export class UserauthService {
  customerStorageData:any;
  private  subject = new Subject<boolean>();
  private baseUrl = coreApiURL;
  constructor(private http: HttpClient) {

   }
   
   getDataFromLocalStorage() {
     this.customerStorageData = localStorage.getItem('customerLogin')
     this.subject.next(JSON.parse(this.customerStorageData))
   }

   sendSubjectResponse():Observable<boolean> {
      return this.subject.asObservable(); 
   }
   
   customerLogin(param:customerLogin):Observable<any>{
     return this.http.post(`${this.baseUrl}${api_url.LOGIN}`,param,{responseType:"text"})
   }

   getUserData() {
     return this.http.get<any>(this.baseUrl)
     .pipe(map((res:any) => {
      return res; 
     }))
   }
   

   putUserData(data:any) {
     return this.http.post<any>(this.baseUrl,data)
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
   
   deleteUserData(id:number) {
    return this.http.delete<any>(this.baseUrl+id)
    .pipe(map((res:any) => {
          return res;
    }))
   }
}
