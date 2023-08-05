import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  hubUrl: string;
  connection: any;
  restaurentId:number = 0;

  constructor(private sharedService:SharedService) {
    this.hubUrl = 'https://localhost:7234/signalr-hub';
    this.sharedService.userData.subscribe((res) =>{
      this.restaurentId = res.id;
    });
  }

  public async initiateSignalrConnection(): Promise<void> {
    try {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl)
        .withAutomaticReconnect()
        .build();

      await this.connection.start({ withCredentials: false });

      console.log(`SignalR connection success! connectionId: ${this.connection.connectionId}`);
    }
    catch (error) {
      console.log(`SignalR connection error: ${error}`);
    }
  }

  broadCastData(methodName: string) {
    this.connection.invoke(methodName).catch();
  }
  helloMessage() {
    return new Observable(observer => {
      this.connection.on('DisplayMessage', (data: any) => {
        observer.next(data);
      });
    })
  }
  getSpicesData() {
    return new Observable(observer => {
      this.connection.on('Spices', (data: any) => {
        observer.next(data);
      });
    })
  }
  getJuiceData() {
    return new Observable(observer => {
      this.connection.on('Juice', (data: any) => {
        observer.next(data);
      });
    })
  }
  getIceCreamData() {
    return new Observable(observer => {
      this.connection.on('IceCream', (data: any) => {
        observer.next(data);
      });
    })
  }
  getCustomerOrders() {
    let orders:any = [];
    return new Observable(observer => {
      this.connection.on('Orders', (data: any) => {
        data.forEach((res:any) => {
          if(res.restaurentId == this.restaurentId)
          {
            orders.push(res);
          }
          
        });
        observer.next(orders);
      });
    })
  }
 

}
