import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { coreApiURL } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class RestaurentUserService {

  private baseUrl = coreApiURL+"RestaurentsLogin";
  constructor(private http: HttpClient) {
  }
  checkLoginData(data: any) {
    return this.http.post<any>(this.baseUrl, data)
      .pipe(map((res: any) => {
        return res;
      }));
}
}
