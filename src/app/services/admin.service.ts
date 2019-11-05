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
}
