import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonDatetime, Platform, ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/Order';
import { OrderService} from 'src/app/services/order.service';
import { SellPostSuccessPage } from '../sell-post-success/sell-post-success.page';
import { TimeService } from 'src/app/services/time.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sell-rate-set',
  templateUrl: './sell-rate-set.page.html',
  styleUrls: ['./sell-rate-set.page.scss'],
})
export class SellRateSetPage implements OnInit {

  sellRateSetForm: FormGroup;
  sellerId: any;
  deviceId: any;
  startTime: any;
  endTime: any;
  startTimeDetails: any;
  endTimeDetails: any;
  totalAmount: any = "00.00";
  deviceName: string;
  duration: string;
  power: string;


  rate:any;

  order: Order = {};

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
      this.power = params['power'];
      this.sellerId = params['sellerId'];
      this.deviceId = params['deviceId'];
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
    this.order.sellerId = this.sellerId;
    this.order.deviceId = this.deviceId;
    this.order.powerToSell = +this.power;
    this.order.transferStartTs = this.timeService.startTime;
    this.order.transferEndTs = this.timeService.endTime;
    this.order.ratePerUnit = this.rate;
    this.order.totalAmount = 1000;
    this.orderService.createSellOrder(this.order);
    this.orderService.printSellOrderList();
    // this.router.navigate(['sell-post-success'], {
    //   queryParams: {}
    // });
    this.presentModal();
  }

  async presentModal()
  {
    const myModal = await this.modal.create({
      component: SellPostSuccessPage,
      cssClass: 'my-custom-modal-css'
    });
    return await myModal.present();
  }


}
