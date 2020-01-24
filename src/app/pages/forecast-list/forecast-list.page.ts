import { Component, OnInit } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';
import { IngressService } from 'src/app/services/ingress.service';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.page.html',
  styleUrls: ['./forecast-list.page.scss'],
})
export class ForecastListPage implements OnInit {
  resFromServer: any;
  forecastList: any;
  userId: any;

  power: number;
  remainingPower: number; 
  sellSolar: boolean=false;
  sellGenerator: boolean=false;
  sellEV: boolean=false;

  cssClassColor: any = "grey-bg";
  
  constructor(private forecastService: ForecastService
    , private ingressService: IngressService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.ingressService.getUserIdToken().then((res) => {
      this.userId = res;
      if(this.userId) {
        this.forecastService.getForecasts(this.userId).subscribe((res) => {
          this.resFromServer = res;
          console.log('forecast response : ' , this.resFromServer);
          this.forecastList = this.forecastService.formatForecastData(this.resFromServer.allForecasts);
        });
      }
    })
  }

  getForecastPower(forecast: any) {
    var powerAvailable = forecast.solar_power + forecast.generator_power + forecast.ev_power;
    return (powerAvailable - forecast.user_load);
  }

  sellForecast(forecast: any) {
    this.power = this.remainingPower = forecast.power;
    if (forecast.solar_power <= this.power) {
      this.sellSolar = true;
      this.remainingPower = this.power - forecast.solar_power;
    }
    if (this.remainingPower > 0) {
      if (forecast.generator_power <= this.remainingPower) {
        this.sellGenerator = true;
        this.remainingPower = this.remainingPower - forecast.generator_power;
      }
      if (this.remainingPower > 0) {
        if (forecast.ev_power <= this.remainingPower) {
          this.sellEV = true;
          this.remainingPower = this.remainingPower - forecast.ev_power;
        }
      }
    }
  }

  buyForecast(forecast: any) {
  }
}
