import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { INGRESS_URL, CONFIG_URL, TRADE_URL, ORDER_URL, FORECAST_URL } from 'src/app/environments/environments';
import { AllTimeslots } from 'src/app/models/AllTimeslots';
//import { start } from 'repl';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  getForecastsUrl = FORECAST_URL + '/getForecastDetails';

  tsArr: AllTimeslots[] = [];
  timeslot: AllTimeslots = {};

  constructor(private httpClient: HttpClient) {}

  getForecasts(userId: any) {
    console.log('getForecasts user id : ' , userId);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(this.getForecastsUrl + '/' + userId
      , options
    );
  }

  formatForecastData(forecastList: any[]) {
    if(forecastList==null) {
      return;
    }
    var i=0;
    while(i<forecastList.length) {
      var k=0;
      var power=0;
      while(k<4) {
        power = power + this.getForecastPower(forecastList[i]);
        i++;
        k++;
      }
      this.insertTimeSlotData(i/4, power, forecastList[i/4].forecast_date);
    }
  }

  getForecastPower(forecast: any) {
    var powerAvailable = forecast.solar_power + forecast.generator_power + forecast.ev_power;
    return (powerAvailable - forecast.user_load);
  }

  insertTimeSlotData(tsId: number, power: number , date: string) {
    this.timeslot = {};
    this.timeslot.tsId = tsId;
    var dayTimeslot = tsId % 24;
    var startTime = dayTimeslot - 1;
    var endTime = startTime + 1;
    var today = new Date();
    if(startTime<10){
      this.timeslot.tsStartTime = '0' + startTime + ':00';
    }
    else {
      this.timeslot.tsStartTime = startTime + ':00';
    }
    if(endTime<10){
      this.timeslot.tsEndTime = '0' + endTime + ':00';
    }
    else {
      this.timeslot.tsEndTime = endTime + ':00';
    }
    if(((dayTimeslot-1)%12)==0) {
      this.timeslot.tsStartTimeMeridiem = 'AM';
      this.timeslot.tsStartTimeMeridiem = 'AM';
    }
    if(((dayTimeslot-1)%12)==1) {
      this.timeslot.tsStartTimeMeridiem = 'PM';
      this.timeslot.tsStartTimeMeridiem = 'PM';
    }
    if(today.toISOString() == date) {
      this.timeslot.date = 'Today';
    }
    else {
      this.timeslot.date = this.formatTime(date, 'd');
    }
    this.timeslot.powerToSell = power;
    this.timeslot.perUnitPrice = 5;
    this.timeslot.totalPrice = 175.00;

    this.tsArr.push(this.timeslot);
  }

  formatTime(ts, type) {
    if (type == 't')
      return moment(ts).format("hh:mm A");
    else if (type == 'd')
      return moment(ts).format("Do MMM");
  }
}
