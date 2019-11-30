import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { IngressService } from 'src/app/services/ingress.service';
import { SellOrderPayload } from 'src/app/models/SellOrderPayload';
import { BuyOrderPayload } from 'src/app/models/BuyOrderPayload';
import { ACTION_CREATE, ACTION_EDIT } from 'src/app/environments/environments';
import { OrderService } from 'src/app/services/order.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  selectedOption = 'sell';
  checkSell: boolean = true;
  checkBuy: boolean = false;
  showSolar: boolean = true;
  showGenerator: boolean = true;
  showEV: boolean = true;
  solarCapacity: string;
  generatorCapacity: string;
  evCapacity: string;

  solarSelected: boolean=false;
  generatorSelected: boolean=false;
  evSelected: boolean=false;

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

  constructor(private router: Router
    , private route: ActivatedRoute
    , private nav: NavController
    , private orderService: OrderService
    , private ingressService: IngressService
    , private alertController: AlertController) {
    this.showSolar = false;
    this.showGenerator = false;
    this.showEV = false;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.allOrdersAndContracts = [];
    this.orderListUpdated = [];
    this.allOrders = [];
    this.index = 0;
    this.length = 0;
    this.powerToSell='';
    this.deviceCapactiy='';
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
          this.allOrdersAndContracts=[];
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
    });
  }

  fineTuneOrderList() {
    this.orderListUpdated=[];
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
    this.displayOrderList=[];
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
    this.allOrders=[];
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
    this.userDeviceId=null;
    this.deviceTypeId=null;
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
        this.presentAlert("Max value cant be less than Min value.");
        this.validInputsFlag = false;
      }
      if (this.validInputsFlag) {
        this.buyOrderPayload.minAmount = this.minPowerToBuy;
        this.buyOrderPayload.maxAmount = this.maxPowerToBuy;

        console.log('dashboard : ', this.buyOrderPayload);

        this.router.navigate(['/buy-time-picker'], {
          queryParams: {
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
        this.presentAlert("You cant sell more than your device capacity.");
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
    if(this.solarSelected || this.generatorSelected || this.evSelected) {
      console.log('check2');
      return true;
    }
    return false; 
  }
}
