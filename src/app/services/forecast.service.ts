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

  getForecastsUrl = FORECAST_URL + 'getForecastDetails';

  tsArr: AllTimeslots[] = [];
  timeslot: AllTimeslots = {};

  forecastList: any[] = [];
  deviceList: any[] = [];

  formattedForecastList: any[] = [];
  forecast: any = {};

  lastForecastFetchedDate: string='';
  forecastFetched=false;

  constructor(private httpClient: HttpClient) {
    this.formattedForecastList = [];
  }

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
    console.log('forecast list from forecast page length : ' , forecastList.length);
    while(i<forecastList.length) {
      var k=0;
      var power=0;
      var solarPower=0;
      var generatorPower=0;
      var evpower=0;
      var userLoad=0;
      var price=0;
      var startTime='';
      var endTime='';
      var userId='';
      var userName='';
      var forecastDate='';
      var solarDeviceId='';
      var generatorDeviceId='';
      var evDeviceId='';
      solarDeviceId = forecastList[i].solarDeviceId;
      generatorDeviceId = forecastList[i].generatorDeviceId;
      evDeviceId = forecastList[i].evDeviceId;
      while(k<4) {
        if(forecastList[i]==null) {
          return;
        }
        if(k==0) {
          startTime = forecastList[i].startTime;
          forecastDate = forecastList[i].forecastDate;
          userId = forecastList[i].userId;
          userName = forecastList[i].userName;
        }
        if(k==3) {
          endTime = forecastList[i].endTime;
        }
        power = power + this.getForecastPower(forecastList[i]);
        solarPower = solarPower + forecastList[i].solarPower;
        generatorPower = generatorPower + forecastList[i].generatorPower;
        evpower = evpower + forecastList[i].evpower;
        userLoad = userLoad + forecastList[i].userLoad;
        price = price + forecastList[i].pricePerUnit;
        i++;
        k++;
      }
      
      this.insertFormattedForecastData(startTime, endTime, forecastDate, power/4, price/4, 
        userId, userName, solarPower/4, evpower/4, generatorPower/4, userLoad/4,
        solarDeviceId, generatorDeviceId, evDeviceId);
    }
    console.log('forecast list from forecast page formatted : ' , this.formattedForecastList);
  }

  insertFormattedForecastData(startTime: string, endTime: string, forecastDate: string, 
    power: number, pricePerUnit: any, userId: any, userName: string, solarPower: number, 
    evpower: number, generatorPower: number, userLoad: number,
    solarDeviceId: any, generatorDeviceId: any, evDeviceId: any) {
      this.forecast.userId = userId;
      this.forecast.userName = userName;
      this.forecast.startTime = startTime;
      this.forecast.endTime = endTime;
      this.forecast.forecastDate = forecastDate;
      if(pricePerUnit!=null) {
        this.forecast.pricePerUnit = +pricePerUnit.toFixed(2);
      }
      if(power!=null) {
        this.forecast.power = +power.toFixed(2);
      }
      if(solarPower!=null) {
        this.forecast.solarPower = +solarPower.toFixed(2);
      }
      if(evpower!=null) {
        this.forecast.evpower = +evpower.toFixed(2);
      }
      if(generatorPower!=null) {
        this.forecast.generatorPower = +generatorPower.toFixed(2);
      }
      if(userLoad!=null) {
        this.forecast.userLoad = +userLoad.toFixed(2);
      }
      this.forecast.solarDeviceId = solarDeviceId;
      this.forecast.generatorDeviceId = generatorDeviceId;
      this.forecast.evDeviceId = evDeviceId;
      this.formattedForecastList.push(this.forecast);
      this.forecast = {};
    }

  getForecastPower(forecast: any) {
    console.log('forecast list from forecast page each forecast : ' , forecast);
    var powerAvailable = forecast.solarPower + forecast.generatorPower + forecast.evpower;
    return (powerAvailable - forecast.userLoad);
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
      this.timeslot.tsEndTimeMeridiem = 'AM';
    }
    if(((dayTimeslot-1)%12)==1) {
      this.timeslot.tsStartTimeMeridiem = 'PM';
      this.timeslot.tsEndTimeMeridiem = 'PM';
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
