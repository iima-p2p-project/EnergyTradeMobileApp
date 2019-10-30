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
          this.forecastList = this.resFromServer.allForecasts;
        });
      }
    })
  }

  getForecastPower(forecast: any) {
    var powerAvailable = forecast.solar_power + forecast.generator_power + forecast.ev_power;
    return (powerAvailable - forecast.user_load);
  }

  sellForecast(forecast: any) {
  }
}
