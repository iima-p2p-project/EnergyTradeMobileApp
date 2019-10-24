import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonDatetime, AlertController } from '@ionic/angular';
import { Order } from 'src/app/models/Order';
import { OrderService} from 'src/app/services/order.service';


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

  constructor(private formBuilder: FormBuilder
    , private router: Router
    , private route: ActivatedRoute
    , private orderService: OrderService, private alertController: AlertController) { 
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
    this.sellRateSetForm.controls['totalAmount'].setValue("XXXX");
    console.log('date as string : ' , this.startTime);
  }

  async submit() {
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

    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Post Successful!',
      message: 'You have successfully posted  your post. Edit or cancel your post from Manager Orders',
      buttons: ['MANAGE ORDERS']
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);


    // this.order.createUser(this.sellRateSetForm)
    // .subscribe( data => {
    //   this.router.navigate([''])
    // })
  }

}
