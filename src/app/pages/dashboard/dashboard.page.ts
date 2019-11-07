import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { IngressService } from 'src/app/services/ingress.service';
import { SellOrderPayload } from 'src/app/models/SellOrderPayload';
import { BuyOrderPayload } from 'src/app/models/BuyOrderPayload';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  selectedOption = 'sell';
  showSolar: boolean = true;
  showGenerator: boolean = true;
  showEV: boolean = true;
  solarCapacity: string;
  generatorCapacity: string;
  evCapacity: string;

  solarDeviceId: any;
  generatorDeviceId: any;
  evDeviceId: any;
  validInputsFlag = false;

  solarDeviceTypeId: any;
  generatorDeviceTypeId: any;
  evDeviceTypeId: any;

  deviceCapactiy: any = 100;
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
    , private nav: NavController
    , private ingressService: IngressService
    , private alertController: AlertController) {
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

  segmentChanged($event) {
    // console.log($event.detail.value);
    this.selectedOption = $event.detail.value;
  }

  go() {


    if (this.selectedOption == 'sell') {
      this.sellOrderPayload.sellerId = this.userId;
      //this.sellOrderPayload.deviceId = this.userDeviceId;
      this.sellOrderPayload.powerToSell = this.powerToSell;
      console.log('user id from dashboard : ', this.userId);
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
    else if (this.selectedOption == 'buy') {

      if (this.maxPowerToBuy > this.minPowerToBuy)
        this.validInputsFlag = true;
      else {
        this.presentAlert("Max value cant be less than Min value.");
        this.validInputsFlag = false;
      }
      if (this.validInputsFlag) {
        this.buyOrderPayload.budgetMin = this.minPowerToBuy;
        this.buyOrderPayload.budgetMax = this.maxPowerToBuy;

        console.log('dashboard : ', this.buyOrderPayload);

        this.router.navigate(['/buy-time-picker'], {
          queryParams: {
            buyerId: this.userId,
            unitMin: this.minPowerToBuy,
            unitMax: this.maxPowerToBuy
          }
        });
      }
    }
  }

  selectSolarDeviceToSellPower() {
    this.deviceTypeId = this.solarDeviceTypeId;
    this.userDeviceId = this.solarDeviceId;
    this.deviceCapactiy = this.solarCapacity;
  }

  selectGeneratorDeviceToSellPower() {
    this.deviceTypeId = this.generatorDeviceTypeId;
    this.userDeviceId = this.generatorDeviceId;
    this.deviceCapactiy = this.generatorCapacity;
  }

  selectEVDeviceToSellPower() {
    this.deviceTypeId = this.evDeviceTypeId;
    this.userDeviceId = this.evDeviceId;
    this.deviceCapactiy = this.evCapacity;
  }
  powerInput(power) {
    console.log("Power input detected", power);
    if (this.deviceCapactiy && power)
      if (power > this.deviceCapactiy) {
        this.presentAlert("You cant sell more than your device capacity.");
        this.powerToSell = 0;
      } else {
        this.powerToSell = power;
      }

  }


  async presentAlert(alertmsg) {

    //const alertMsg = `<span>${alertmsg}.</span>`;

    const alert = await this.alertController.create({
      message: alertmsg,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
