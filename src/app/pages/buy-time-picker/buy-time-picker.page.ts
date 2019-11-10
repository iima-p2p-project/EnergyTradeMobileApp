import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { BuyOrderPayload } from 'src/app/models/BuyOrderPayload';
import { TimeService } from 'src/app/services/time.service';
import { OrderService } from 'src/app/services/order.service';
import { USER_ROLE } from 'src/app/environments/environments';


@Component({
  selector: 'app-buy-time-picker',
  templateUrl: './buy-time-picker.page.html',
  styleUrls: ['./buy-time-picker.page.scss'],
})
export class BuyTimePickerPage implements OnInit {

  screenMode: any;
  screenWidth: any;
  buyOrderPayload: BuyOrderPayload = {};
  buyerId: any;

  startTime: string;
  endTime: string;

  budgetMin: any;
  budgetMax: any;

  unitMin: any;
  unitMax: any;

  durationInHours: any = '00';
  durationInMins: any = '00';
  durationDetails: any;
  duration: any = "00:00";

  startTimeDetails: any = "DAY,DD MM";
  endTimeDetails: any = "DAY,DD MM";
  inputsValidFlag = false;

  constructor(
    public platform: Platform,
    private route: ActivatedRoute,
    private timeService: TimeService,
    private orderService: OrderService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
    //determine if screen is big or small
    this.screenWidth = this.platform.width();
    if (this.screenWidth > 760) {
      this.screenMode = "big"
    }
    else {
      this.screenMode = "small";
    }
    this.route.queryParams.subscribe(params => {
      this.buyerId = params['buyerId'];
      this.unitMin = params['unitMin'];
      this.unitMax = params['unitMax'];
    });
  }
  getStartTimeDetails() {
    this.durationDetails = this.timeService.getStartTimeDetails(this.startTime, this.endTime, USER_ROLE);
    if (this.durationDetails != null) {
      this.startTimeDetails = this.durationDetails.startTimeDetails;
      this.duration = this.durationDetails.duration;
      if (this.duration == "INVALID") {
        console.log("Invalid Time range");
        this.presentAlert("End Time cant be before start time");
        this.duration = "00:00";
        this.inputsValidFlag = false;
      } else {
        this.inputsValidFlag = true;
      }
    }
  }

  getEndTimeDetails() {
    this.durationDetails = this.timeService.getEndTimeDetails(this.startTime, this.endTime, USER_ROLE);
    if (this.durationDetails != null) {
      this.endTimeDetails = this.durationDetails.endTimeDetails;
      this.duration = this.durationDetails.duration;
      if (this.duration == "INVALID") {
        console.log("Invalid Time range");
       // this.presentAlert("End Time cant be before start time");
        this.duration = "00:00";
        this.inputsValidFlag = true;
      } else {
        this.inputsValidFlag = true;
      }
    }
  }

  findSellers() {

    if (this.inputsValidFlag && this.budgetMin && this.budgetMax && this.budgetMax >= this.budgetMin) {
      // this.buyOrderPayload.unitMin = this.unitMin;
      // this.buyOrderPayload.unitMax = this.unitMax;
      // this.buyOrderPayload.startTime = this.startTime;
      // this.buyOrderPayload.endTime = this.endTime;
      // this.buyOrderPayload.budgetMin = this.budgetMin;
      // this.buyOrderPayload.budgetMax = this.budgetMax;
      // this.orderService.searchBuyLeads(this.buyOrderPayload).subscribe( (data) => console.log(data));
      this.router.navigate(['/seller-list'], {
        queryParams: {
          buyerId: this.buyerId,
          unitMin: this.unitMin,
          unitMax: this.unitMax,
          startTime: this.startTime,
          endTime: this.endTime,
          budgetMin: this.budgetMin,
          budgetMax: this.budgetMax
        }
      });
    } else {
      this.presentAlert("Invalid Inputs. Cant proceed.")
    }
  }

  ngOnInit() {
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
