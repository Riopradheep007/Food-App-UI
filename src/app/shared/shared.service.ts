import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInformation } from './Models/userInformation';
import { HttpClient } from '@angular/common/http';
import { api_url, coreApiURL } from '../constants/api.constants';
import { SideBarMenu } from '../models/sideBarMenu.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userInformation = new BehaviorSubject<any>("");
  userData:Observable<any>  = this.userInformation.asObservable();
  constructor(private http:HttpClient) { }

  setUserInformation(data:UserInformation)
  {
    this.userInformation.next(data);
  }

  setUserInformationInSessionStorage(data:any)
  {
    let roleName = JSON.parse(data).role;
    sessionStorage.setItem(roleName, data);
  }

  getDataFromSessionStorage()
  {
    let userInformation:any;
    let size = sessionStorage.length;
    if(size > 0 && size!=null)
    {
      for (let i = 0; i < size; i++) {
        let sessionKey = sessionStorage.key(i)?.toString();
        if (sessionKey === 'Customer' || sessionKey === 'Restaurent' || sessionKey === 'DeliveryRider') {
        {
          userInformation  = sessionStorage.getItem(sessionKey);
          this.setUserInformation(JSON.parse(userInformation));
        }
      }
    }
  }}
  clearSessionData()
  {
    sessionStorage.clear();
  }

  getUserData()
  {
    let data:any;
    this.userData.subscribe(res =>{
      data = res;
    })
    return data;
  }
  getSideBarMenu(role:string)
  {
    return this.http.get<SideBarMenu[]>(`${coreApiURL}${api_url.GET_SIDEBAR_MENUS}/${role}`);
  }

}
