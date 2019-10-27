import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NavController} from '@ionic/angular';
import { IngressService } from 'src/app/services/ingress.service';
import { SellOrderPayload } from 'src/app/models/SellOrderPayload';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  selectedOption='sell';
  showSolar: boolean = true;
  showGenerator: boolean = true;
  showEV: boolean = true;

  solarCapacity: string;
  generatorCapacity: string;
  evCapacity: string;

  solarDeviceId: any;
  generatorDeviceId: any;
  evDeviceId: any;

  deviceCapactiy: any;
  deviceTypeId: any;
  userDeviceId: any;

  userDeviceList: any;

  powerToSell: any;

  sellOrderPayload: SellOrderPayload = {};

  userId: any;

  constructor(private router: Router
    , private route: ActivatedRoute
    , private nav:NavController
    , private ingressService: IngressService) { 
      this.showSolar = false;
      this.showGenerator = false;
      this.showEV = false;
    }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      if(params['redirect'] == '/login') {
        this.userDeviceList = this.ingressService.getUserDevicesFromLocal();
        if(this.userDeviceList!=null){
          this.userDeviceList.forEach(element => {
            if(element.deviceTypeId == 1) {
              this.solarDeviceId = element.userDeviceId;
              this.showSolar = true;
              this.solarCapacity = element.capacity;
            }
            if(element.deviceTypeId == 2) {
              this.generatorDeviceId = element.userDeviceId;
              this.showGenerator = true;
              this.generatorCapacity = element.capacity;
            }
            if(element.deviceTypeId == 3) {
              this.evDeviceId = element.userDeviceId;
              this.showEV = true;
              this.evCapacity = element.capacity;
            }
          });
        }
      }
      else {
        if (params['showSolar'] == "true") {
          this.showSolar = true;
          this.solarCapacity = params['solarCapacity'];
        }
        else {
          this.showSolar = false;
        }
        if (params['showGenerator'] == "true") {
          this.showGenerator = true;
          this.generatorCapacity = params['generatorCapacity'];
        }
        else {
          this.showGenerator = false;
        }
        if (params['showEV'] == "true") {
          this.showEV = true;
          this.evCapacity = params['evCapacity'];
        }
        else {
          this.showEV = false;
        }
      } 
    });
  }

  initiateSellFlow(sellFlowDetails: any) {
  }

  initiateBuyFlow(buyFlowDetails: any) {
    this.router.navigate(['/buy-time-picker'], {
      queryParams: {
        sellOrderPayload: this.sellOrderPayload
      }
    });
  }

  segmentChanged($event)
  {
    // console.log($event.detail.value);
    this.selectedOption=$event.detail.value;
  }

  go()
  {
    if(this.selectedOption=='sell')
    {
      this.sellOrderPayload.sellerId = this.userId;
      this.sellOrderPayload.deviceId = this.userDeviceId;
      this.sellOrderPayload.powerToSell = this.powerToSell;
      console.log('sell order payload from dashboard : ' , this.sellOrderPayload);
      this.router.navigate(['/sell-time-picker'], {
        queryParams: {
          sellerId: this.userId,
          deviceId: this.userDeviceId,
          powerToSell: this.powerToSell,
        }
      });
      //this.initiateSellFlow(this.sellOrderPayload);
      //this.nav.navigateForward('sell-time-picker');
    }
    else if(this.selectedOption=='buy')
    {
      this.nav.navigateForward('buy-time-picker');
    }
  }

  selectSolarDeviceToSellPower() {
    this.deviceTypeId = 1;
    this.userDeviceId = this.solarDeviceId;
    this.deviceCapactiy = this.solarCapacity;
  }

  selectGeneratorDeviceToSellPower() {
    this.deviceTypeId = 2;
    this.userDeviceId = this.generatorDeviceId;
    this.deviceCapactiy = this.generatorCapacity;
  }

  selectEVDeviceToSellPower() {
    this.deviceTypeId = 3;
    this.userDeviceId = this.evDeviceId;
    this.deviceCapactiy = this.evCapacity;
  }
}
