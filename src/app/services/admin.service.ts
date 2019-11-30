import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { IonDatetime } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { INGRESS_URL, CONFIG_URL, TRADE_URL, ORDER_URL, ADMIN_URL } from 'src/app/environments/environments';
import { AllCustomer } from 'src/app/models/AllCustomer';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  createNonTradeHourUrl = ADMIN_URL + 'createNonTradeHour';
  editNonTradeHourUrl = ADMIN_URL + 'editNonTradeHour';
  cancelNonTradeHourUrl = ADMIN_URL + 'cancelNonTradeHour';
  getAllNonTradeHoursUrl = ADMIN_URL + 'getNonTradeHours';
  getAllTradeUrl = ADMIN_URL + 'getAllTrades';
  getUsersByAdminUrl = ADMIN_URL + 'getUSersByAdmin';
  getUserOrdersByAdminUrl = ADMIN_URL + 'getUserOrdersByAdmin';

  nonTradeHoursList: any;
  allBuyLeads: any;
  allSellLeads: any;

  buyLeadsCount: any;
  sellLeadsCount: any;

  customerList: AllCustomer[] = [];

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

  getAllTrades(userId: any) {
    console.log('getAllSellLeads user id : ' , userId);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(this.getAllTradeUrl + '/' + userId
      , options
    );
  }

  getUsersByAdmin(userId: any) {
    console.log('getUsersByAdmin user id : ' , userId);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(this.getUsersByAdminUrl + '/' + userId
      , options
    );
  }

  getUserOrdersByAdmin(userId: any) {
    console.log('getUserOrdersByAdmin user id : ' , userId);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(this.getUserOrdersByAdminUrl + '/' + userId
      , options
    );
  }
}
