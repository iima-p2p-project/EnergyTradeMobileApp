import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NavController} from '@ionic/angular';
import { IngressService } from 'src/app/services/ingress.service';
import { SellOrderPayload } from 'src/app/models/SellOrderPayload';
import { BuyOrderPayload } from 'src/app/models/BuyOrderPayload';
 
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

  solarDeviceTypeId: any;
  generatorDeviceTypeId: any;
  evDeviceTypeId: any;

  deviceCapactiy: any;
  deviceTypeId: any;
  userDeviceId: any;

  userDeviceList: any;

  powerToSell: any;
  minPowerToBuy: any;
  maxPowerToBuy: any;

  sellOrderPayload: SellOrderPayload = {};
  buyOrderPayload: BuyOrderPayload = {};

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
      //this.userId = params['userId'];
      this.ingressService.getUserIdToken().then((res) => {
        this.userId = res;
        this.ingressService.loggedInUserId = this.userId;
        this.ingressService.getUserDevicesToken().then((res) => {
          this.userDeviceList = res;
          if (this.userDeviceList != null) {
            this.userDeviceList.forEach(element => {
              if (element.deviceTypeId == 1) {
                this.solarDeviceId = element.userDeviceId;
                this.solarDeviceTypeId = element.deviceTypeId;
                this.showSolar = true;
                this.solarCapacity = element.capacity;
              }
              if (element.deviceTypeId == 2) {
                this.generatorDeviceId = element.userDeviceId;
                this.generatorDeviceTypeId = element.deviceTypeId;
                this.showGenerator = true;
                this.generatorCapacity = element.capacity;
              }
              if (element.deviceTypeId == 3) {
                this.evDeviceId = element.userDeviceId;
                this.evDeviceTypeId = element.deviceTypeId;
                this.showEV = true;
                this.evCapacity = element.capacity;
              }
            });
          }
        });
      });
      // else {
      //   if (params['showSolar'] == "true") {
      //     this.showSolar = true;
      //     this.solarCapacity = params['solarCapacity'];
      //   }
      //   else {
      //     this.showSolar = false;
      //   }
      //   if (params['showGenerator'] == "true") {
      //     this.showGenerator = true;
      //     this.generatorCapacity = params['generatorCapacity'];
      //   }
      //   else {
      //     this.showGenerator = false;
      //   }
      //   if (params['showEV'] == "true") {
      //     this.showEV = true;
      //     this.evCapacity = params['evCapacity'];
      //   }
      //   else {
      //     this.showEV = false;
      //   }
      // }
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
      //this.sellOrderPayload.deviceId = this.userDeviceId;
      this.sellOrderPayload.powerToSell = this.powerToSell;
      console.log('user id from dashboard : ' , this.userId);
      this.router.navigate(['/sell-time-picker'], {
        queryParams: {
          sellerId: this.userId,
          userDeviceId: this.userDeviceId,
          deviceTypeId: this.deviceTypeId,
          powerToSell: this.powerToSell,
        }
      });
      //this.initiateSellFlow(this.sellOrderPayload);
      //this.nav.navigateForward('sell-time-picker');
    }
    else if(this.selectedOption=='buy')
    {
      this.buyOrderPayload.budgetMin = this.minPowerToBuy;
      this.buyOrderPayload.budgetMax = this.maxPowerToBuy;

      console.log('dashboard : ' , this.buyOrderPayload);

      this.router.navigate(['/buy-time-picker'], {
        queryParams: {
          buyerId: this.userId,
          unitMin: this.minPowerToBuy,
          unitMax: this.maxPowerToBuy
        }
      });
    }
  }

  selectSolarDeviceToSellPower() {
    this.deviceTypeId = this.solarDeviceTypeId;
    this.userDeviceId = this.solarDeviceId;
    this.deviceCapactiy = this.solarCapacity;

    //TOGGLE TO CHANGE COLOURS
    this.showSolar=this.toggleTrueFalse(this.showSolar);
    if(this.showSolar==true)
    {
      this.showGenerator=false;
      this.showEV=false
    }
  }

  selectGeneratorDeviceToSellPower() {
    this.deviceTypeId = this.generatorDeviceTypeId;
    this.userDeviceId = this.generatorDeviceId;
    this.deviceCapactiy = this.generatorCapacity;

    //TOGGLE TO CHANGE COLOURS
    this.showGenerator=this.toggleTrueFalse(this.showGenerator);
    if(this.showGenerator==true)
    {
      this.showEV=false;
      this.showSolar=false;
    }
  }

  selectEVDeviceToSellPower() {
    this.deviceTypeId = this.evDeviceTypeId;
    this.userDeviceId = this.evDeviceId;
    this.deviceCapactiy = this.evCapacity;

    //TOGGLE TO CHANGE COLOURS
    this.showEV=this.toggleTrueFalse(this.showEV);
    if(this.showEV==true)
    {
      this.showSolar=false;
      this.showGenerator=false;
    }
  }

  toggleTrueFalse(what)
  {
    if(what==true)
    {
      return false;
    }
    else if(what==false)
    {
      return true;
    }
  }
}
