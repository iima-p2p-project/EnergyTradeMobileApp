import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { IonDatetime } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { INGRESS_URL, CONFIG_URL, TRADE_URL, ORDER_URL, ADMIN_URL } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  createNonTradeHourUrl = ADMIN_URL + 'createNonTradeHour';
  editNonTradeHourUrl = ADMIN_URL + 'editNonTradeHour';
  cancelNonTradeHourUrl = ADMIN_URL + 'cancelNonTradeHour';
  getAllNonTradeHoursUrl = ADMIN_URL + 'getNonTradeHours';
  getAllBuyLeadsUrl = ADMIN_URL + 'getAllContracts';
  getAllSellLeadsUrl = ADMIN_URL + 'getAllSellOrders';

  nonTradeHoursList: any;
  allBuyLeads: any;
  allSellLeads: any;

  buyLeadsCount: any;
  sellLeadsCount: any;

  constructor(private httpClient: HttpClient) { }

  createNonTradeHour(payload) {
    console.log("Create Non Trade Hour : ", payload);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.createNonTradeHourUrl
      , payload
      , options
    );
  }

  editNonTradeHour(payload, nonTradeHourId) {
    console.log("Edit Non Trade Hour : ", payload);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.editNonTradeHourUrl + '/' + nonTradeHourId
      , payload
      , options
    );
  }

  cancelNonTradeHour(payload, nonTradeHourId) {
    console.log("Cancel Non Trade Hour : ", payload);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.cancelNonTradeHourUrl + '/' + nonTradeHourId
      , payload
      , options
    );
  }

  getAllNonTradeHours(userId: any) {
    console.log('getAllNonTradeHours user id : ' , userId);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(this.getAllNonTradeHoursUrl + '/' + userId
      , options
    );
  }

  getAllBuyLeads(userId: any) {
    console.log('getAllBuyLeads user id : ' , userId);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(this.getAllBuyLeadsUrl
      , options
    );
  }

  getAllSellLeads(userId: any) {
    console.log('getAllSellLeads user id : ' , userId);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(this.getAllSellLeadsUrl
      , options
    );
  }
}
