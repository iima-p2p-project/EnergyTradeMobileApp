import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonDatetime, Platform, ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/Order';
import { SellOrderPayload } from 'src/app/models/SellOrderPayload';
import { OrderService} from 'src/app/services/order.service';
import { SellPostSuccessPage } from '../sell-post-success/sell-post-success.page';
import { TimeService } from 'src/app/services/time.service';
import * as moment from 'moment';
import { USER_ROLE, ACTION_CREATE, ACTION_EDIT } from 'src/app/environments/environments';

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
  deviceName: string;
  duration: string;
  power: string;
  sellOrderId: any;
  action: any;
  rate: any;

  sellOrderPayload: SellOrderPayload = {};

  //Screenwidth
  screenWidth:any;
  screenMode:any;

  constructor(private formBuilder: FormBuilder,
    public modal:ModalController
    , private router: Router,
    public platform:Platform
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
    this.screenWidth=this.platform.width();
      if(this.screenWidth>760)
      {
        this.screenMode="big"
      }
      else
      {
        this.screenMode="small";
      }

    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
      this.sellOrderId = params['sellOrderId'];
      this.power = params['power'];
      this.sellerId = params['sellerId'];
      this.userDeviceId = params['userDeviceId'];
      this.deviceTypeId = params['deviceTypeId'];
    });

    this.startTime = moment(this.timeService.startTime).format('hh:mm A');
    this.endTime = moment(this.timeService.endTime).format('hh:mm A');
    this.startTimeDetails = this.timeService.startTimeDetails;
    this.endTimeDetails = this.timeService.endTimeDetails;
    this.duration = this.timeService.duration;
  }

  calculateTotalAmount() {
    this.totalAmount = parseInt(this.rate) * parseInt(this.power);
  }

  async submit() {
    if(this.action == ACTION_CREATE) {
      this.sellOrderPayload.sellerId = this.sellerId;
      this.sellOrderPayload.deviceTypeId = this.deviceTypeId;
      this.sellOrderPayload.userDeviceId = this.userDeviceId;
      this.sellOrderPayload.powerToSell = +this.power;
      this.sellOrderPayload.transferStartTs = this.timeService.startTime;
      this.sellOrderPayload.transferEndTs = this.timeService.endTime;
      this.sellOrderPayload.ratePerUnit = this.rate;
      this.sellOrderPayload.totalAmount = this.totalAmount;
      this.orderService.createSellOrder(this.sellOrderPayload).subscribe( (data) => console.log(data));
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
  }

  async presentModal(){
    const myModal = await this.modal.create({
      component: SellPostSuccessPage,
      cssClass: 'my-custom-modal-css'
    });
    return await myModal.present();
  }
}
