import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonDatetime, Platform, ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/Order';
import { SellOrderPayload } from 'src/app/models/SellOrderPayload';
import { OrderService } from 'src/app/services/order.service';
import { SellPostSuccessPage } from '../sell-post-success/sell-post-success.page';
import { TimeService } from 'src/app/services/time.service';
import * as moment from 'moment';
import { USER_ROLE, ACTION_CREATE, ACTION_EDIT, ACTION_FORECAST } from 'src/app/environments/environments';
import { strictEqual } from 'assert';

@Component({
  selector: 'app-sell-rate-set',
  templateUrl: './sell-rate-set.page.html',
  styleUrls: ['./sell-rate-set.page.scss'],
})
export class SellRateSetPage implements OnInit {

  sellRateSetForm: FormGroup;
  sellerId: any;
  userDeviceId: any;
  deviceTypeId: any;
  startTime: any;
  endTime: any;
  startTimeDetails: any;
  endTimeDetails: any;
  totalAmount: any = "00.00";
  totalAmountStr: any = "00.00";
  deviceName: string;
  duration: string;
  energy: string;
  power: string;
  sellOrderId: any;
  action: any;
  rate: any;
  currentTime: any;
  // sellSolar: boolean=false;
  // sellGenerator: boolean=false;
  // sellEV: boolean=false;

  sellSolar: string = '';
  sellGenerator: string = '';
  sellEV: string = '';

  solarPowerToSell: number = 0;
  generatorPowerToSell: number = 0;
  evPowerToSell: number = 0;

  solarEnergyToSell: number = 0;
  generatorEnergyToSell: number = 0;
  evEnergyToSell: number = 0;

  solarDeviceId: any;
  generatorDeviceId: any;
  evDeviceId: any;

  sellOrderPayload: SellOrderPayload = {};

  forecastSellDetails: SellOrderPayload[] = [];

  //Screenwidth
  screenWidth: any;
  screenMode: any;
  disableEnergyField;

  constructor(private formBuilder: FormBuilder,
    public modal: ModalController
    , private router: Router,
    public platform: Platform
    , private route: ActivatedRoute
    , private orderService: OrderService
    , private timeService: TimeService) {
    this.sellRateSetForm = this.formBuilder.group({
      rate: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      duration: [null, Validators.required],
      power: [null, Validators.required],
      totalAmount: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.screenWidth = this.platform.width();
    if (this.screenWidth > 760) {
      this.screenMode = "big"
    }
    else {
      this.screenMode = "small";
    }

    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
      if (this.action == ACTION_CREATE || this.action == ACTION_EDIT) {
        this.disableEnergyField = false;
        this.sellOrderId = params['sellOrderId'];
        this.energy = params['energy'];
        this.power = params['power'];
        this.sellerId = params['sellerId'];
        this.userDeviceId = params['userDeviceId'];
        this.deviceTypeId = params['deviceTypeId'];
      }
      else if (this.action == ACTION_FORECAST) {
        this.disableEnergyField = true;
        this.rate = params['pricePerUnit'];
        this.sellerId = params['sellerId'];
        this.sellSolar = params['sellSolar'];
        this.sellGenerator = params['sellGenerator'];
        this.sellEV = params['sellEV'];
        this.solarDeviceId = params['solarDeviceId'];
        this.generatorDeviceId = params['generatorDeviceId'];
        this.evDeviceId = params['evDeviceId'];
        this.solarPowerToSell = params['solarPowerToSell'];
        this.generatorPowerToSell = params['generatorPowerToSell'];
        this.evPowerToSell = params['evPowerToSell'];
        this.solarEnergyToSell = params['solarEnergyToSell'];
        this.generatorEnergyToSell = params['generatorEnergyToSell'];
        this.evEnergyToSell = params['evEnergyToSell'];
        this.power = this.energy = params['totalPowerToSell'];
        console.log('POWER : ', this.power);
        console.log('RATE : ', this.rate);
        this.totalAmount = (+this.power) * (+this.rate);
        console.log('solarDeviceId', this.solarDeviceId);
        console.log('generatorDeviceId', this.generatorDeviceId);
        console.log('evDeviceId', this.evDeviceId);
        //this.startTime = moment(params['startTime']).format('hh:mm A');
        //this.endTime = moment(params['endTime']).format('hh:mm A');
      } else {
        this.disableEnergyField = true;
      }
    });
    this.startTime = moment(this.timeService.startTime).format('hh:mm A');
    this.endTime = moment(this.timeService.endTime).format('hh:mm A');
    this.startTimeDetails = this.timeService.startTimeDetails;
    this.endTimeDetails = this.timeService.endTimeDetails;
    console.log('start time : ', this.startTime);
    console.log('end time : ', this.endTime);
    console.log('start time details : ', this.startTimeDetails);
    console.log('end time details : ', this.endTimeDetails);
    this.duration = this.timeService.duration;
    this.currentTime = new Date().toISOString().substring(0, 10);
    // if (this.rate)
    //   this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    // console.log('POWER 1 : ', this.energy);
    // console.log('RATE 1 : ', this.rate);
    //this.totalAmount = parseInt(this.rate) * parseInt(this.energy);
    this.totalAmount = (+this.energy) * +(+this.rate).toFixed(2);
    this.totalAmount = +this.totalAmount.toFixed(2);
    this.totalAmountStr = this.totalAmount + "";
    // var rateArr = this.totalAmount.toString().split('.');
    // if (rateArr[1] != null) {
    //   var len = rateArr[1].length;
    //   if (len > 2) {
    //     this.totalAmountStr = rateArr[0] + '.' + rateArr[1].substring(0, 2);
    //   }
    //   else {
    //     this.totalAmountStr = rateArr[0] + '.' + rateArr[1];
    //   }
    // }
    // else {
    //   this.totalAmountStr = this.totalAmount;
    // }
  }

  async submit() {
    if (this.action == ACTION_CREATE) {
      this.sellOrderPayload.sellerId = this.sellerId;
      this.sellOrderPayload.deviceTypeId = this.deviceTypeId;
      this.sellOrderPayload.userDeviceId = this.userDeviceId;
      this.sellOrderPayload.powerToSell = +this.power;
      this.sellOrderPayload.energy = this.energy;
      this.sellOrderPayload.transferStartTs = this.timeService.startTime;
      this.sellOrderPayload.transferEndTs = this.timeService.endTime;
      this.sellOrderPayload.ratePerUnit = this.rate.toFixed(2);
      this.sellOrderPayload.totalAmount = this.totalAmount.toFixed(2);
      this.orderService.createSellOrder(this.sellOrderPayload).subscribe((data) => console.log(data));
      this.orderService.printSellOrderList();
      // this.router.navigate(['sell-post-success'], {
      //   queryParams: {}
      // });
      this.presentModal();
    }
    if (this.action == ACTION_EDIT) {
      this.sellOrderPayload.sellerId = this.sellerId;
      this.sellOrderPayload.deviceTypeId = this.deviceTypeId;
      this.sellOrderPayload.userDeviceId = this.userDeviceId;
      this.sellOrderPayload.powerToSell = +this.power;
      this.sellOrderPayload.energy = this.energy;
      //this.sellOrderPayload.transferStartTs = String(this.timeService.startTime).substring(0, String(this.timeService.startTime).length-4);
      //this.sellOrderPayload.transferEndTs = String(this.timeService.endTime).substring(0, String(this.timeService.endTime).length-4);
      this.sellOrderPayload.transferStartTs = this.timeService.startTime;
      this.sellOrderPayload.transferEndTs = this.timeService.endTime;
      this.sellOrderPayload.ratePerUnit = this.rate;
      this.sellOrderPayload.totalAmount = this.totalAmount;
      this.orderService.editSellOrder(this.sellOrderPayload, this.sellOrderId).subscribe((data) => console.log(data));
      this.orderService.printSellOrderList();
      // this.router.navigate(['sell-post-success'], {
      //   queryParams: {}
      // });
      this.presentModal();
    }
    if (this.action == ACTION_FORECAST) {
      console.log('sell solar : ', this.sellSolar);
      console.log('sell generator : ', this.sellGenerator);
      console.log('sell ev : ', this.sellEV);
      console.log('forecast sell orders before : ', this.forecastSellDetails);
      if (this.sellSolar == 'true') {
        this.sellOrderPayload.deviceTypeId = "1";
        this.sellOrderPayload.sellerId = this.sellerId;
        this.sellOrderPayload.userDeviceId = this.solarDeviceId;
        this.sellOrderPayload.transferStartTs = this.timeService.startTime;
        this.sellOrderPayload.transferEndTs = this.timeService.endTime;
        this.sellOrderPayload.powerToSell = +this.solarPowerToSell;
        this.sellOrderPayload.energy = this.solarEnergyToSell.toString();
        this.sellOrderPayload.ratePerUnit = +this.rate;
        this.sellOrderPayload.totalAmount = (+this.solarPowerToSell) * (+this.rate);
        this.forecastSellDetails.push(this.sellOrderPayload);
        this.sellOrderPayload = {};
      }
      if (this.sellGenerator == 'true') {
        this.sellOrderPayload.deviceTypeId = "2";
        this.sellOrderPayload.sellerId = this.sellerId;
        this.sellOrderPayload.userDeviceId = this.generatorDeviceId;
        this.sellOrderPayload.transferStartTs = this.timeService.startTime;
        this.sellOrderPayload.transferEndTs = this.timeService.endTime;
        this.sellOrderPayload.powerToSell = +this.generatorPowerToSell;
        this.sellOrderPayload.energy = this.generatorEnergyToSell.toString();
        this.sellOrderPayload.ratePerUnit = +this.rate;
        this.sellOrderPayload.totalAmount = (+this.generatorPowerToSell) * (+this.rate);
        this.forecastSellDetails.push(this.sellOrderPayload);
        this.sellOrderPayload = {};
      }
      if (this.sellEV == 'true') {
        this.sellOrderPayload.deviceTypeId = "3";
        this.sellOrderPayload.sellerId = this.sellerId;
        this.sellOrderPayload.userDeviceId = this.evDeviceId;
        this.sellOrderPayload.transferStartTs = this.timeService.startTime;
        this.sellOrderPayload.transferEndTs = this.timeService.endTime;
        this.sellOrderPayload.powerToSell = +this.evPowerToSell;
        this.sellOrderPayload.energy = this.evEnergyToSell.toString();
        this.sellOrderPayload.ratePerUnit = +this.rate;
        this.sellOrderPayload.totalAmount = (+this.evPowerToSell) * (+this.rate);
        this.forecastSellDetails.push(this.sellOrderPayload);
        this.sellOrderPayload = {};
      }
      console.log('forecast sell orders after : ', this.forecastSellDetails);
      this.orderService.createSellOrdersFromForecast(this.forecastSellDetails).subscribe((data) => console.log(data));
      this.orderService.printSellOrderList();
      // this.router.navigate(['sell-post-success'], {
      //   queryParams: {}
      // });
      this.presentModal();
    }
  }

  async presentModal() {
    const myModal = await this.modal.create({
      component: SellPostSuccessPage,
      cssClass: 'my-custom-modal-small-css'
    });
    return await myModal.present();
  }
}
