import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { IonDatetime } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  sellOrderList: Order[] = [{orderId: 1,
    orderType: "SELL",
    deviceName: "SOLAR",
    power: 200,
    startTime: "2019-01-01T11:00",
    endTime: "2019-01-01T11:00",
    duration: 1,
    ratePerUnit: 10,
    totalAmount: 2000,
    budgerRange: 0,
    softdeleteflag: false}
  
    ,

  {orderId: 2,
    orderType: "SELL",
    deviceName: "EV",
    power: 100,
    startTime: "2019-01-07T10:00",
    endTime: "2019-01-07T11:00",
    duration: 1,
    ratePerUnit: 7,
    totalAmount: 700,
    budgerRange: -1,
    softdeleteflag: false}];

  
  buyOrderList: Order[] = [{orderId: 3,
    orderType: "BUY",
    deviceName: "SOLAR",
    power: 200,
    startTime: "2019-01-01T10:00",
    endTime: "2019-01-01T11:00",
    duration: 1,
    ratePerUnit: -1,
    totalAmount: -1,
    budgerRange: 2000,
    softdeleteflag: false}
  
    ,

  {orderId: 4,
    orderType: "BUY",
    deviceName: "EV",
    power: 100,
    startTime: "2019-01-07T10:00",
    endTime: "2019-01-07T11:00",
    duration: 1,
    ratePerUnit: -1,
    totalAmount: -1,
    budgerRange: 700,
    softdeleteflag: false}];

  constructor() { 
  }

  createSellOrder(order: Order) {
    this.sellOrderList.push(order);
  }

  printSellOrderList() {
    console.log('Sell Order List : ' , this.sellOrderList);
  }
}
