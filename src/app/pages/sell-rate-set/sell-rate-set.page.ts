import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonDatetime, Platform, ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/Order';
import { OrderService} from 'src/app/services/order.service';
import { SellPostSuccessPage } from '../sell-post-success/sell-post-success.page';


@Component({
  selector: 'app-sell-rate-set',
  templateUrl: './sell-rate-set.page.html',
  styleUrls: ['./sell-rate-set.page.scss'],
})
export class SellRateSetPage implements OnInit {

  sellRateSetForm: FormGroup;
  startTime: string;
  endTime: string;
  totalAmount: string;
  deviceName: string;
  duration: string;
  power: string;

  rate:string;

  order: Order = {};

  //Screenwidth
  screenWidth:any;
  screenMode:any;

  constructor(private formBuilder: FormBuilder,
    public modal:ModalController
    , private router: Router,
    public platform:Platform
    , private route: ActivatedRoute
    , private orderService: OrderService) { 
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
      this.deviceName = params['deviceName'];
      this.power = params['power'];
      this.startTime = params['startTime'];
      this.endTime = params['endTime'];
      this.duration = params['duration'];
    });

    this.sellRateSetForm.controls['startTime'].setValue(this.startTime);
    this.sellRateSetForm.controls['endTime'].setValue(this.endTime);
    this.sellRateSetForm.controls['duration'].setValue(this.duration);
    this.sellRateSetForm.controls['power'].setValue(this.power);
    this.sellRateSetForm.controls['totalAmount'].setValue("00.00");
    console.log('date as string : ' , this.startTime);
  }

  submit() {
    this.order.orderId = 1;
    this.order.orderType = 'SELL';
    this.order.deviceName = this.deviceName;
    this.order.duration = +this.duration;
    this.order.power = +this.power;
    this.order.ratePerUnit = +this.sellRateSetForm.controls['rate'].value;
    this.order.totalAmount = 1000;
    this.order.startTime = this.startTime;
    this.order.endTime = this.endTime;
    this.order.status = "INITIATED";
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
