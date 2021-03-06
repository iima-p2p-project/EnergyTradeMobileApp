import { Component, OnInit } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';
import { IngressService } from 'src/app/services/ingress.service';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { ACTION_FORECAST } from 'src/app/environments/environments';
import { TimeService } from 'src/app/services/time.service';
import { USER_ROLE, ACTION_CREATE, ACTION_EDIT } from 'src/app/environments/environments';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.page.html',
  styleUrls: ['./forecast-list.page.scss'],
})
export class ForecastListPage implements OnInit {
  resFromServer: any;
  forecastList: any[] = [];
  deviceList: any[] = [];
  userId: any;

  power: number;
  remainingPower: number;

  sellSolar: boolean = false;
  sellGenerator: boolean = false;
  sellEV: boolean = false;

  solarPowerToSell: number = 0;
  generatorPowerToSell: number = 0;
  evPowerToSell: number = 0;

  solarEnergyToSell: number = 0;
  generatorEnergyToSell: number = 0;
  evEnergyToSell: number = 0;

  solarDeviceId: any;
  generatorDeviceId: any;
  evDeviceId: any;

  totalAmount: number = 0;

  cssClassColor: any = "grey-bg";

  constructor(private forecastService: ForecastService
    , private ingressService: IngressService
    , private router: Router
    , private timeService: TimeService
    , private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.ingressService.getUserIdToken().then((res) => {
      this.userId = res;
      if (this.userId) {
        // this.forecastService.getForecasts(this.userId).subscribe((res) => {
        //   this.resFromServer = res;
        //   console.log('forecast response : ' , this.resFromServer);
        //   //this.forecastList = this.forecastService.formatForecastData(this.resFromServer.allForecasts);
        //   this.forecastList=this.resFromServer.response.listOfForecast;
        //   console.log('forecast response : ' , this.forecastList);
        //   if(this.forecastList!=null) {
        //     this.forecastList.forEach(forecast => {
        //       if(forecast!=null) {
        //         this.deviceList=forecast.listOfUserDevices;
        //         if(this.deviceList!=null) {
        //           this.deviceList.forEach(device => {
        //             if(device!=null) {
        //               if(device.deviceTypeId==1 && device.deviceTypeName=='Solar') {
        //                 this.solarDeviceId=device.userDeviceId;
        //               }
        //               if(device.deviceTypeId==2 && device.deviceTypeName=='Generator') {
        //                 this.generatorDeviceId=device.userDeviceId;
        //               }
        //               if(device.deviceTypeId==3 && device.deviceTypeName=='EV') {
        //                 this.evDeviceId=device.userDeviceId;
        //               }
        //             }
        //           });
        //         }
        //       }
        //     });
        //   }
        // });
        console.log('forecast list from forecast page : ', this.forecastService.formattedForecastList);
        //this.forecastService.formatForecastData(this.forecastService.forecastList);
        //this.forecastList=this.forecastService.forecastList;
        this.forecastList = this.forecastService.formattedForecastList;
        this.deviceList = this.forecastService.deviceList;
      }
    })
  }

  getForecastPower(forecast: any) {
    var powerAvailable = forecast.solarPower + forecast.generatorPower + forecast.evpower;
    return (powerAvailable - forecast.userLoad);
  }

  getForecastPowerToDisplay(forecast: any) {
    var powerAvailable = forecast.solarPower + forecast.generatorPower + forecast.evpower;
    if (forecast.userLoad > powerAvailable) {
      return (forecast.userLoad - powerAvailable);
    }
    else {
      return (powerAvailable - forecast.userLoad);
    }
  }

  sellForecast(forecast: any) {
    this.power = this.getForecastPowerToDisplay(forecast);
    console.log('forecast sell : ', forecast);
    this.remainingPower = this.power;
    if (forecast.solarPower <= this.power) {
      this.sellSolar = true;
      this.solarPowerToSell = forecast.solarPower;
      this.solarEnergyToSell = this.solarPowerToSell;
      this.remainingPower = this.power - forecast.solarPower;
    }
    if (this.remainingPower > 0) {
      if (forecast.generatorPower <= this.remainingPower) {
        this.sellGenerator = true;
        this.generatorPowerToSell = forecast.generatorPower;
        this.generatorEnergyToSell = this.generatorPowerToSell;
        this.remainingPower = this.remainingPower - forecast.generatorPower;
      }
      if (this.remainingPower > 0) {
        if (forecast.evpower <= this.remainingPower) {
          this.sellEV = true;
          this.evPowerToSell = forecast.evpower;
          this.evEnergyToSell = this.evPowerToSell;
          this.remainingPower = this.remainingPower - forecast.evpower;
        }
      }
    }
    this.timeService.getStartTimeDetails(forecast.startTime, forecast.endTime, USER_ROLE);
    this.timeService.getEndTimeDetails(forecast.startTime, forecast.endTime, USER_ROLE);
    this.router.navigate(['/sell-rate-set'], {
      queryParams: {
        action: ACTION_FORECAST,
        sellerId: this.userId,
        sellSolar: this.sellSolar,
        solarDeviceId: this.ingressService.solarDeviceId,
        solarPowerToSell: this.solarPowerToSell,
        solarEnergyToSell: this.solarEnergyToSell,
        sellGenerator: this.sellGenerator,
        generatorDeviceId: this.ingressService.generatorDeviceId,
        generatorPowerToSell: this.generatorPowerToSell,
        generatorEnergyToSell: this.generatorEnergyToSell,
        sellEV: this.sellEV,
        evDeviceId: this.ingressService.evDeviceId,
        evPowerToSell: this.evPowerToSell,
        evEnergyToSell: this.evEnergyToSell,
        totalPowerToSell: this.power,
        pricePerUnit: forecast.pricePerUnit,
        startTime: forecast.startTime,
        endTime: forecast.endTime
      }
    });
  }

  buyForecast(forecast: any) {
    this.power = this.getForecastPowerToDisplay(forecast);
    this.totalAmount = (this.power) * (+forecast.pricePerUnit);
    this.timeService.getStartTimeDetails(forecast.startTime, forecast.endTime, USER_ROLE);
    this.timeService.getEndTimeDetails(forecast.startTime, forecast.endTime, USER_ROLE);
    this.router.navigate(['/seller-list'], {
      queryParams: {
        action: ACTION_FORECAST,
        buyerId: this.userId,
        unitMin: this.power - 10,
        unitMax: this.power + 10,
        budgetMin: this.getTotalAmount(this.power, forecast.pricePerUnit) - 100,
        budgetMax: this.getTotalAmount(this.power, forecast.pricePerUnit) + 100,
        startTime: forecast.startTime,
        endTime: forecast.endTime
      }
    });
  }

  formatTime(ts, type) {
    if (ts != null) {
      ts = ts.substring(0, 10) + ' ' + ts.substring(11, 16) + ':00';
      console.log('TSSSS : ', ts);
      if (type == 't')
        return moment(ts).format("hh:mm A");
      else if (type == 'd')
        return moment(ts).format("Do MMM");
    }
  }


  formatTimeCheckWithCurrentTime(ts, type) {
    if(ts!=null) {
      ts=ts.substring(0, 10) + ' ' + ts.substring(11, 16) + ':00';
      console.log('TSSSS : ' , ts);
      if (type == 't')
        return moment(ts).format("hh:mm A");
      else if(type == 'd') {
        if((moment(new Date().toISOString()).format("Do MMM"))==(moment(ts).format("Do MMM")))
          return 'Today';
        else
          return moment(ts).format("Do MMM");
      }
    }
  }

  getTotalAmount(power: number, pricePerUnit: number) {
    return +(power * pricePerUnit).toFixed(2);
  }
}
