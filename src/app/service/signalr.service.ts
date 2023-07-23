import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  hubUrl: string;
  connection: any;

  constructor() {
    this.hubUrl = 'https://localhost:7234/signalr-hub';
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
 

}
