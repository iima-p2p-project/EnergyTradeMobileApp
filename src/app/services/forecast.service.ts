import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { INGRESS_URL, CONFIG_URL, TRADE_URL } from 'src/app/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  getForecastsUrl = TRADE_URL + '/getForecasts';

  constructor(private httpClient: HttpClient) {}

  getForecasts(userId: any) {
    console.log('getForecasts user id : ' , userId);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.getForecastsUrl
      , {"userId": userId}
      , options
    );
  }
}
