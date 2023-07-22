import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SharedService } from "../shared/shared.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    authToken:string = '';
    constructor(private sharedService:SharedService) {
        this.sharedService.userData.subscribe((res) =>{
            this.authToken = res.token;
        });
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       if(this.authToken) {
        req = req.clone({
            setHeaders:{Authorization:`Bearer ${this.authToken}`},
        });
       }

       return next.handle(req);
    }

}