import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController, ModalController, Platform } from '@ionic/angular';
import { IngressService } from 'src/app/services/ingress.service';
import { SellOrderPayload } from 'src/app/models/SellOrderPayload';
import { BuyOrderPayload } from 'src/app/models/BuyOrderPayload';
import { ACTION_CREATE, ACTION_EDIT } from 'src/app/environments/environments';
import { OrderService } from 'src/app/services/order.service';
import * as moment from 'moment';
import { InvalidInputModalPage } from 'src/app/invalid-input-modal/invalid-input-modal.page';
import { ForecastService } from 'src/app/services/forecast.service';
import { BackButtonService } from 'src/app/services/back-button.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  selectedOption = 'sell';
  checkSell: boolean = true;
  checkBuy: boolean = false;
  showSolar: boolean = false;
  showGenerator: boolean = false;
  showEV: boolean = false;
  solarCapacity: string;
  generatorCapacity: string;
  evCapacity: string;

  solarSelected: boolean = false;
  generatorSelected: boolean = false;
  evSelected: boolean = false;

  solarDeviceId: any;
  generatorDeviceId: any;
  evDeviceId: any;
  validInputsFlag = false;

  solarDeviceTypeId: any;
  generatorDeviceTypeId: any;
  evDeviceTypeId: any;
  allOrders: any = [];
  deviceCapactiy: any = '';
  deviceTypeId: any;
  userDeviceId: any;
  displayOrderList;
  userDeviceList: any;
  orderListUpdated: any = [];
  powerToSell: any;
  minPowerToBuy: any;
  maxPowerToBuy: any;
  allOrdersAndContracts = [];
  sellOrderPayload: SellOrderPayload = {};
  buyOrderPayload: BuyOrderPayload = {};
  resFromServer: any;
  userId: any;
  userLocation: any;
  index: number = 0;
  length: number = 0;

  forecastList: any[] = [];
  deviceList: any[] = [];

  userHasOnlyLoad = false;

  upcomingForecast: any;
  upcomingForecastPower: any;
  upcomingForecastPrice: any;
  upcomingForecastStartTime: any;
  upcomingForecastEndTime: any;

  forecastLen: number;

  orderDisabled = false;
  orderCSS = 'card-bottom';
  showGateClosureLabel = false;
  showLiveLabel = false;

  constructor(private router: Router
    , private route: ActivatedRoute
    , private modal: ModalController
    , private nav: NavController
    , private orderService: OrderService
    , private ingressService: IngressService
    , private alertController: AlertController
    , private forecastService: ForecastService
    , private platform: Platform
    , private backButtonService: BackButtonService) {
    this.showSolar = false;
    this.showGenerator = false;
    this.showEV = false;
    this.forecastList = [];
    this.forecastLen = 0;
    // this.configueHardwareBackButton();
  }

  ngOnInit() {
  }


  ionViewWillLeave() {
    this.backButtonService.quitOnBackButton = false;
  }

  ionViewDidEnter() {
    this.backButtonService.quitOnBackButton = true;
    if (new Date().toISOString().substring(0, 10) != this.forecastService.lastForecastFetchedDate) {
      this.forecastService.forecastFetched = false;
    }
    this.allOrdersAndContracts = [];
    this.orderListUpdated = [];
    this.allOrders = [];
    this.index = 0;
    this.length = 0;
    this.powerToSell = '';
    this.deviceCapactiy = '';
    this.deviceTypeId = '';
    this.solarSelected = false;
    this.generatorSelected = false;
    this.evSelected = false;
    this.showSolar = false;
    this.showGenerator = false;
    this.showEV = false;
    this.minPowerToBuy = '';
    this.maxPowerToBuy = '';
    this.route.queryParams.subscribe(params => {
      //this.userId = params['userId'];
      if (params['tab'] != null) {
        console.log('tab : ', params['tab']);
        this.selectedOption = params['tab'];
        if (this.selectedOption == 'sell') {
          this.checkSell = true;
          this.checkBuy = false;
        }
        if (this.selectedOption == 'buy') {
          this.checkSell = false;
          this.checkBuy = true;
        }
      }
    });

    this.ingressService.getUserIdToken().then((res) => {
      this.userId = res;
      this.ingressService.loggedInUserId = this.userId;
      this.ingressService.getUserLocalityNameToken().then((res) => {
        this.userLocation = res;
        this.ingressService.loggedInUserLocalityName = this.userLocation;
      });
      this.orderService.getAllOrdersByUser(this.userId).subscribe((res) => {
        this.resFromServer = res;
        //this.orderList = this.resFromServer.ordersAndContracts;

        console.log("Orders List:", this.resFromServer.response);
        this.orderService.orderList = this.resFromServer.response;
        //combining orders and contracts
        this.allOrdersAndContracts = [];
        if (this.resFromServer.response.sellOrders) {
          for (let i = 0; i < this.resFromServer.response.sellOrders.length; i++) {
            this.allOrdersAndContracts.push(this.resFromServer.response.sellOrders[i]);
          }
        }
        if (this.resFromServer.response.contracts) {
          for (let i = 0; i < this.resFromServer.response.contracts.length; i++) {
            this.allOrdersAndContracts.push(this.resFromServer.response.contracts[i]);
          }
        }
        console.log("All Sell Orders and contracts: ", this.allOrdersAndContracts);
        this.fineTuneOrderList();
      });
      this.ingressService.getUserDevicesToken().then((res) => {
        this.userDeviceList = res;
        if (this.userDeviceList == null) {
          this.userHasOnlyLoad = true;
          this.checkSell = false;
          this.checkBuy = true;
        }
        else if (this.userDeviceList.length == 0) {
          this.userHasOnlyLoad = true;
          this.checkSell = false;
          this.checkBuy = true;
        }
        else {
          this.userDeviceList.forEach(element => {
            if (element.deviceTypeId == 1) {
              this.solarDeviceId = element.userDeviceId;
              this.solarDeviceTypeId = element.deviceTypeId;
              this.showSolar = true;
              this.solarCapacity = element.capacity;
              this.ingressService.solarDeviceId = this.solarDeviceId;
            }
            if (element.deviceTypeId == 2) {
              this.generatorDeviceId = element.userDeviceId;
              this.generatorDeviceTypeId = element.deviceTypeId;
              this.showGenerator = true;
              this.generatorCapacity = element.capacity;
              this.ingressService.generatorDeviceId = this.generatorDeviceId;
            }
            if (element.deviceTypeId == 4) {
              this.evDeviceId = element.userDeviceId;
              this.evDeviceTypeId = element.deviceTypeId;
              this.showEV = true;
              this.evCapacity = element.capacity;
              this.ingressService.evDeviceId = this.evDeviceId;
            }
          });
        }
      });
      //});
      if (this.ingressService.loggedInUserId) {
        if (!this.forecastService.forecastFetched) {
          this.forecastService.forecastList = [];
          this.forecastService.formattedForecastList = [];
          this.forecastService.getForecasts(this.ingressService.loggedInUserId).subscribe((res) => {
            this.resFromServer = res;
            console.log('forecast response : ', this.resFromServer);
            //this.forecastList = this.forecastService.formatForecastData(this.resFromServer.allForecasts);
            this.forecastList = this.resFromServer.response.listOfForecast;
            //this.forecastService.forecastList=this.forecastList;
            console.log('forecast response 123 : ', this.forecastList);
            if (this.forecastList != null) {
              console.log('not null check');
              this.upcomingForecast = this.forecastList[0];
              console.log('upcoming forecast : ', this.upcomingForecast);
              if (this.upcomingForecast.startTime != null) {
                this.upcomingForecastStartTime = this.formatTimeForForecast(this.upcomingForecast.startTime, 't');
              }
              if (this.upcomingForecast.endTime != null) {
                this.upcomingForecastEndTime = this.formatTimeForForecast(this.upcomingForecast.endTime, 't');
              }
              this.upcomingForecastPower = this.upcomingForecast.power;
              this.upcomingForecastPrice = this.upcomingForecast.pricePerUnit;
              this.forecastLen = this.forecastList.length;
              this.forecastList.forEach(forecast => {
                if (forecast != null) {
                  this.deviceList = forecast.listOfUserDevices;
                  this.forecastService.deviceList = this.deviceList;
                  if (this.deviceList != null) {
                    this.deviceList.forEach(device => {
                      if (device != null) {
                        if (device.deviceTypeId == 1 && device.deviceTypeName == 'Solar') {
                          //this.solarDeviceId=device.userDeviceId;
                          forecast.solarDeviceId = device.userDeviceId;
                        }
                        if (device.deviceTypeId == 2 && device.deviceTypeName == 'Generator') {
                          //this.generatorDeviceId=device.userDeviceId;
                          forecast.generatorDeviceId = device.userDeviceId;
                        }
                        if (device.deviceTypeId == 4 && device.deviceTypeName == 'Battery') {
                          //this.evDeviceId=device.userDeviceId;
                          forecast.evDeviceId = device.userDeviceId;
                        }
                      }
                    });
                  }
                }
              });
              this.forecastService.forecastList = this.forecastList;
              this.forecastService.formatForecastData(this.forecastService.forecastList);
            }
          });
          this.forecastService.lastForecastFetchedDate = new Date().toISOString().substring(0, 10);
          this.forecastService.forecastFetched = true;
        }
      }
    });
  }

  fineTuneOrderList() {
    this.orderListUpdated = [];
    for (var i = 0; i < this.allOrdersAndContracts.length; i++) {
      let obj = this.allOrdersAndContracts[i];
      if (!obj.contractId) {
        obj.orderType = "sell";
        obj.orderId = obj.sellOrderId;
      } else if (obj.contractId) {
        obj.orderType = "buy";
        obj.orderId = obj.contractId;
        obj.powerToSell = obj.sellorder.powerToSell;
        obj.totalAmount = obj.sellorder.totalAmount;
        obj.deviceTypeName = obj.sellorder.deviceTypeName;
        obj.transferStartTs = obj.sellorder.transferStartTs;
        obj.transferEndTs = obj.sellorder.transferEndTs;
      }
      if (obj.orderType == "sell")
        obj.month = moment(obj.transferStartTs).format('M');
      else
        obj.month = moment(obj.sellorder.transferStartTs).format('M');
      this.orderListUpdated.push(obj);
    }
    console.log("Updated orders list", this.orderListUpdated);
    this.displayOrderList = [];
    this.displayOrderList = this.orderListUpdated;
    this.displayOrderList.sort((ts1, ts2) => {
      return moment(ts2.transferStartTs).diff(ts1.transferStartTs);
    })
    if (this.orderListUpdated.length < 2) {
      this.length = this.orderListUpdated.length;
    }
    else {
      this.length = 2;
    }
    this.allOrders = [];
    console.log('test index : ', this.index);
    console.log('test length : ', this.length);
    while (this.index < this.length) {
      this.allOrders[this.index] = this.orderListUpdated[this.index];
      this.index++;
    }
    console.log('Latest Transactions : ', this.allOrders);
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
    this.userDeviceId = null;
    this.deviceTypeId = null;
    // console.log($event.detail.value);
    this.selectedOption = $event.detail.value;
    if (this.selectedOption == 'sell') {
      this.checkSell = true;
      this.checkBuy = false;
    }
    if (this.selectedOption == 'buy') {
      this.checkSell = false;
      this.checkBuy = true;
    }
  }

  go() {
    if (this.selectedOption == 'sell') {
      this.sellOrderPayload.sellerId = this.userId;
      //this.sellOrderPayload.deviceId = this.userDeviceId;
      this.sellOrderPayload.powerToSell = this.powerToSell;
      console.log('user id from dashboard : ', this.userId);
      this.router.navigate(['/sell-time-picker'], {
        queryParams: {
          callerPage: 'dashboard',
          action: ACTION_CREATE,
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
        this.invalidInput("Minumum power to buy should be less than maximum power to buy.");
        this.validInputsFlag = false;
      }
      if (this.validInputsFlag) {
        this.buyOrderPayload.minAmount = this.minPowerToBuy;
        this.buyOrderPayload.maxAmount = this.maxPowerToBuy;

        console.log('dashboard : ', this.buyOrderPayload);

        this.router.navigate(['/buy-time-picker'], {
          queryParams: {
            callerPage: 'dashboard',
            buyerId: this.userId,
            deviceTypeId: this.deviceTypeId,
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

    //TOGGLE TO CHANGE COLOURS
    this.solarSelected = this.toggleTrueFalse(this.solarSelected);
    if (this.solarSelected == true) {
      this.generatorSelected = false;
      this.evSelected = false
    }
  }

  selectGeneratorDeviceToSellPower() {
    this.deviceTypeId = this.generatorDeviceTypeId;
    this.userDeviceId = this.generatorDeviceId;
    this.deviceCapactiy = this.generatorCapacity;

    //TOGGLE TO CHANGE COLOURS
    this.generatorSelected = this.toggleTrueFalse(this.generatorSelected);
    if (this.generatorSelected == true) {
      this.solarSelected = false;
      this.evSelected = false;
    }
  }

  selectEVDeviceToSellPower() {
    this.deviceTypeId = this.evDeviceTypeId;
    this.userDeviceId = this.evDeviceId;
    this.deviceCapactiy = this.evCapacity;

    //TOGGLE TO CHANGE COLOURS
    this.evSelected = this.toggleTrueFalse(this.evSelected);
    if (this.evSelected == true) {
      this.solarSelected = false;
      this.generatorSelected = false;
    }
  }

  toggleTrueFalse(what) {
    if (what == true) {
      return false;
    }
    else if (what == false) {
      return true;
    }
  }

  powerInput(power) {
    console.log("Power input detected", power);
    if (this.deviceCapactiy && power)
      if (power > this.deviceCapactiy) {
        this.invalidInput("You cannot sell more than your device capacity.");
        //this.presentAlert("You cant sell more than your device capacity.");
        this.powerToSell = 0;
      } else {
        this.powerToSell = power;
      }
  }

  formatTime(ts, type) {
    if (type == 't')
      return moment(ts).format("hh:mm A");
    else if (type == 'd')
      return moment(ts).format("Do MMM");
  }

  formatTimeForForecast(ts, type) {
    if (ts != null) {
      ts = ts.substring(0, 10) + ' ' + ts.substring(11, 16) + ':00';
      if (type == 't')
        return moment(ts).format("hh:mm A");
      else if (type == 'd')
        return moment(ts).format("Do MMM");
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

  navigateToManageOrders() {
    this.router.navigateByUrl('/manage-orders');
  }

  isDeviceSelectedForSell() {
    console.log('check1');
    if (this.solarSelected || this.generatorSelected || this.evSelected) {
      console.log('check2');
      return true;
    }
    return false;
  }

  async invalidInput(errorDesc: any) {
    let defg = await this.modal.create({
      component: InvalidInputModalPage,
      cssClass: 'input-field-validation-custom-modal-css',
      componentProps: {
        errorDescription: errorDesc
      }
    });
    return await defg.present();
  }

  configueHardwareBackButton() {

    this.platform.backButton.subscribe(() => {
      window.alert("Alert2" + this.constructor.name);
      if (this.constructor.name == "DashboardPage") {
        {
          if (window.confirm("Do you want to exit app?")) {
            navigator["app"].exitApp();
          }
        }
      }
    });
  }

  ionViewDidLeave() {
    this.platform.backButton.unsubscribe();
  }

  getCSS(order) {
    this.orderDisabled = false;
    this.orderCSS = 'card-bottom';
    if (order != null) {
      if (order.orderType == 'sell' &&
      (order.orderStatus == 'Completed' 
      || (order.orderStatus == 'Validated' && order.isFineApplicable == 'N'))) {
        this.orderDisabled = false;
        this.orderCSS = 'card-bottom green';
        this.showLiveLabel = false;
        this.showGateClosureLabel = false;
      }
      else if (order.orderType == 'sell' &&
      (order.orderStatus == 'Cancelled' || order.orderStatus == 'Expired')) {
        this.orderDisabled = true;
        this.orderCSS = 'card-bottom red';
        this.showLiveLabel = false;
        this.showGateClosureLabel = false;
      }
      else if (order.orderType == 'sell' && order.orderStatus == 'Live') {
        this.orderDisabled = false;
        this.orderCSS = 'card-bottom';
        this.showLiveLabel = true;
        this.showGateClosureLabel = false;
      }
      else if (order.orderType == 'sell' && 
      (order.orderStatus == 'Contracted' && order.isCancellable == 'N')) {
        this.orderDisabled = false;
        this.orderCSS = 'card-bottom';
        this.showLiveLabel = false;
        this.showGateClosureLabel = true;
      }
      if (order.orderType == 'sell' &&
      (order.orderStatus == 'Validated' && order.isFineApplicable == 'Y')) {
        this.orderDisabled = false;
        this.orderCSS = 'card-bottom yellow';
        this.showLiveLabel = false;
        this.showGateClosureLabel = false;
      }
      else if (order.orderType == 'buy' &&
      (order.contractStatus == 'Completed' 
      || (order.contractStatus == 'Validated' && order.isFineApplicable == 'N'))) {
        this.orderDisabled = false;
        this.orderCSS = 'card-bottom green';
        this.showLiveLabel = false;
        this.showGateClosureLabel = false;
      }
      else if (order.orderType == 'buy' && 
      (order.contractStatus == 'Cancelled' || order.contractStatus == 'Expired')) {
        this.orderDisabled = true;
        this.orderCSS = 'card-bottom red';
        this.showLiveLabel = false;
        this.showGateClosureLabel = false;
      }
      else if (order.orderType == 'buy' && order.contractStatus == 'Live') {
        this.orderDisabled = false;
        this.showLiveLabel = true;
        this.orderCSS = 'card-bottom';
        this.showGateClosureLabel = false;
      }
      else if (order.orderType == 'buy' && 
      (order.contractStatus == 'Active' && order.isCancellable == 'N')) {
        this.orderDisabled = false;
        this.orderCSS = 'card-bottom';
        this.showLiveLabel = false;
        this.showGateClosureLabel = true;
      }
      if (order.orderType == 'buy' &&
      (order.contractStatus == 'Validated' && order.isFineApplicable == 'Y')) {
        this.orderDisabled = false;
        this.orderCSS = 'card-bottom yellow';
        this.showLiveLabel = false;
        this.showGateClosureLabel = false;
      }
    }
    return this.orderCSS;
  }
}
