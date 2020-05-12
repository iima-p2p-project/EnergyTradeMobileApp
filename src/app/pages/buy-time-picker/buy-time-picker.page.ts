import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { BuyOrderPayload } from 'src/app/models/BuyOrderPayload';
import { TimeService } from 'src/app/services/time.service';
import { OrderService } from 'src/app/services/order.service';
import { USER_ROLE } from 'src/app/environments/environments';
import { InvalidInputModalPage } from 'src/app/invalid-input-modal/invalid-input-modal.page';
import { EndDateModalPage } from 'src/app/end-date-modal/end-date-modal.page';
import * as moment from 'moment';

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
  deviceTypeId: any;
  currentTime: any;
  startTime: string;
  endTime: string;

  budgetMin: any;
  budgetMax: any;

  unitMin: any;
  unitMax: any;

  startTimeFormatted: string;
  endTimeFormatted: string;

  durationInHours: any = '00';
  durationInMins: any = '00';
  durationDetails: any;
  duration: any = "00:00";

  startTimeDetails: any = "DAY,DD MM";
  endTimeDetails: any = "DAY,DD MM";
  // inputsValidFlag = false;
  callerPage: string;
  startValid = false;
  endValid = false;

  constructor(
    public platform: Platform,
    private route: ActivatedRoute,
    private timeService: TimeService,
    private orderService: OrderService,
    private router: Router,
    public modal: ModalController,
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
      this.deviceTypeId = params['deviceTypeId'];
      this.buyerId = params['buyerId'];
      this.unitMin = params['unitMin'];
      this.unitMax = params['unitMax'];
      this.callerPage = params['callerPage'];
      if (this.startTime == null && this.endTime == null) {
        this.timeService.startTime = null;
        this.timeService.endTime = null;
        this.timeService.isStartTimeSelected = false;
        this.timeService.isEndTimeSelected = false;
      }
    });
    this.currentTime = new Date().toISOString().substring(0, 10);
  }
  getStartTimeDetails() {
    this.formatTime(this.startTime, 's');
    let timediff = moment(this.startTimeFormatted).diff(moment(), 'minutes');

    let cutOffStartTime = moment(moment(this.startTimeFormatted).format("YYYY-MM-DD") + "T06:00:00.000");
    if (this.deviceTypeId == 1 && moment(this.startTimeFormatted).isBefore(cutOffStartTime)) {
      this.invalidDates("Start Time for Solar Devices cannot be before 06:00 AM");
      this.startValid = false;
      return;
    }
    if (this.timeService.getDuration(this.startTimeFormatted, new Date().toISOString(), USER_ROLE).durationTime > 0) {
      this.invalidDates("Please select a future time.");
      this.duration = "00:00";
      this.startValid = false;
      return;
    } else if (timediff < 60) {
      this.invalidDates("Start time should be atleast 1 hour from present time");
      this.duration = "00:00";
      this.startValid = false;
      return;
    }
    this.startValid = true;
    this.durationDetails = this.timeService.getStartTimeDetails(this.startTimeFormatted, this.endTimeFormatted, USER_ROLE);
    if (this.durationDetails != null) {
      this.startTimeDetails = this.durationDetails.startTimeDetails;
      if (this.durationDetails.duration) {
        this.duration = this.durationDetails.duration.duration;
        if (this.durationDetails.duration.durationTime <= 0) {
          console.log("Invalid Time range");
          //this.presentAlert("End Time shall be after start time");
          this.invalidDates("Start time cannot be more than end time");
          this.duration = "00:00";
          // this.inputsValidFlag = false;
          this.startValid = false;
        } else {
          // this.inputsValidFlag = true;
          this.startValid = true;
        }
      }
      else {
        this.duration = "00:00";
      }
    }
  }

  getEndTimeDetails() {
    this.formatTime(this.endTime, 'e');
    let cutOffEndTime = moment(moment(this.endTimeFormatted).format("YYYY-MM-DD") + "T18:00:00.000");
    if (this.deviceTypeId == 1 && moment(this.endTimeFormatted).isAfter(cutOffEndTime)) {
      this.invalidDates("End Time for Solar Devices cannot be after 06:00 PM");
      this.endValid = false;
      return;
    }
    if (this.timeService.getDuration(this.endTimeFormatted, new Date().toISOString(), USER_ROLE).durationTime > 0) {
      this.invalidDates("Please select a future time.");
      this.duration = "00:00";
      // this.inputsValidFlag = false;
      this.endValid = false;
      return;
    }
    this.endValid = true;
    this.durationDetails = this.timeService.getEndTimeDetails(this.startTimeFormatted, this.endTimeFormatted, USER_ROLE);
    if (this.durationDetails != null) {
      this.endTimeDetails = this.durationDetails.endTimeDetails;
      if (this.durationDetails.duration) {
        this.duration = this.durationDetails.duration.duration;
        if (this.durationDetails.duration.durationTime <= 0) {
          console.log("Invalid Time range");
          //this.presentAlert("End Time shall be after start time");
          this.invalidDates("Start time cannot be more than end time");
          this.duration = "00:00";
          // this.inputsValidFlag = false;
          this.endValid = false;
        } else {
          // this.inputsValidFlag = true;
          this.endValid = true;
        }
      }
      else {
        this.duration = "00:00";
      }
    }
  }

  findSellers() {

    if (this.endValid && this.startValid && this.budgetMin && this.budgetMin >= 0 && this.budgetMax >= 0 && this.budgetMax && +this.budgetMax >= +this.budgetMin) {
      // this.buyOrderPayload.unitMin = this.unitMin;
      // this.buyOrderPayload.unitMax = this.unitMax;
      // this.buyOrderPayload.startTime = this.startTime;
      // this.buyOrderPayload.endTime = this.endTime;
      // this.buyOrderPayload.budgetMin = this.budgetMin;
      // this.buyOrderPayload.budgetMax = this.budgetMax;
      // this.orderService.searchBuyLeads(this.buyOrderPayload).subscribe( (data) => console.log(data));
      this.router.navigate(['/seller-list'], {
        queryParams: {
          deviceTypeId: this.deviceTypeId,
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
      //this.presentAlert("Invalid Inputs. Cant proceed.")
      this.invalidInput();
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

  async invalidInput() {
    let defg = await this.modal.create({
      component: InvalidInputModalPage,
      cssClass: 'input-field-validation-custom-modal-css',
      componentProps: {
        errorDescription: 'Please make sure you have entered values for all the input fields.'
      }
    });
    return await defg.present();
  }

  async invalidDates(message: string) {
    let defg = await this.modal.create({
      component: EndDateModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        errorMessage: message
      }
    });
    return await defg.present();
  }

  formatTime(time, tag) {
    if (time != null) {
      time = time.substring(0, 10) + ' ' + time.substring(11, 16) + ':00';
    }
    if (tag == 's') {
      this.startTimeFormatted = time;
    }
    if (tag == 'e') {
      this.endTimeFormatted = time;
    }
  }
}
