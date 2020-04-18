import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IonDatetime, Platform, AlertController, ModalController } from '@ionic/angular';
import { SellOrderPayload } from 'src/app/models/SellOrderPayload';
import * as moment from 'moment';
import { TimeService } from 'src/app/services/time.service';
import { USER_ROLE, ACTION_CREATE, ACTION_EDIT } from 'src/app/environments/environments';
import { InvalidInputModalPage } from 'src/app/invalid-input-modal/invalid-input-modal.page';
import { EndDateModalPage } from 'src/app/end-date-modal/end-date-modal.page';

@Component({
  selector: 'app-sell-time-picker',
  templateUrl: './sell-time-picker.page.html',
  styleUrls: ['./sell-time-picker.page.scss'],
})
export class SellTimePickerPage implements OnInit {

  //Used to determine screen size
  screenMode: any;
  screenWidth: any;

  totalNumberOfMins: number;
  durationInHours: number;
  durationInMins: number;
  durationDetails: any;
  duration: any = "00:00";

  startTimeDetails: any = "DAY,DD MM";
  endTimeDetails: any = "DAY,DD MM";


  sellOrderPayload: SellOrderPayload = {};
  sellTimePickerForm: FormGroup;
  startTime: string;
  endTime: string;
  deviceName: string;
  // duration: string;
  power: number = 156;
  energy: number = 0;

  startTimeFormatted: string;
  endTimeFormatted: string;

  sellerId: any;
  userDeviceId: any;
  deviceTypeId: any = 1;
  inputsValidFlag = false;

  sellOrderId: any;
  action: any;

  callerPage: string;

  currentTime: any;

  constructor(private router: Router,
    private platform: Platform,
    private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private timeService: TimeService
    , public modal: ModalController
    , private alertController: AlertController) {

    this.sellTimePickerForm = this.formBuilder.group({
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      duration: [null, Validators.required]
    });

    //determine if screen is big or small
    this.screenWidth = platform.width();
    if (this.screenWidth > 760) {
      this.screenMode = "big"
    }
    else {
      this.screenMode = "small";
    }
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.startTimeFormatted='';
    this.endTimeFormatted='';
    this.callerPage='';
    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
      if (this.action == ACTION_CREATE) {
        this.power = params['powerToSell'];
        this.sellerId = params['sellerId'];
        this.userDeviceId = params['userDeviceId'];
        this.deviceTypeId = params['deviceTypeId'];
        console.log("caller page inside oninit 1 : " , this.callerPage);
        this.callerPage = params['callerPage'];
        console.log("caller page inside oninit 2 : " , this.callerPage);
        if(this.startTime==null && this.endTime==null) {
          this.timeService.startTime=null;
          this.timeService.endTime=null;
          this.timeService.isStartTimeSelected=false;
          this.timeService.isEndTimeSelected=false;
        }
      }
      if (this.action == ACTION_EDIT) {
        this.sellOrderId = params['sellOrderId'];
        this.startTime = params['startTime'];
        this.endTime = params['endTime'];
        this.power = params['powerToSell'];
        this.sellerId = params['sellerId'];
        this.userDeviceId = params['userDeviceId'];
        this.deviceTypeId = params['deviceTypeId'];
        this.getStartTimeDetails();
        this.getEndTimeDetails();
      }
      console.log('sell time picker start time : ', this.startTime);
      console.log('sell time picker end time : ', this.endTime);
      console.log('sell time picker user device id : ', this.userDeviceId);
      console.log('sell time picker device type id : ', this.deviceTypeId);
      console.log('sell time picker seller id : ', this.sellerId);
      this.currentTime = new Date().toISOString().substring(0, 10);
      console.log('current date : ', new Date().toISOString());
      console.log('current date : ', this.currentTime);
    });
  }

  getStartTimeDetails() {
    this.formatTime(this.startTime, 's');
    if (this.timeService.getDuration(this.startTimeFormatted, new Date().toISOString(), USER_ROLE).durationTime > 0) {
      this.invalidDates("Please select a future time.");
      this.duration = "00:00";
      this.inputsValidFlag = false;
      return;
    }
    this.durationDetails = this.timeService.getStartTimeDetails(this.startTimeFormatted, this.endTimeFormatted, USER_ROLE);
    if (this.durationDetails != null) {
      this.startTimeDetails = this.durationDetails.startTimeDetails;
      if (this.durationDetails.duration) {
        this.duration = this.durationDetails.duration.duration;
        console.log('duration object in start time : ' , this.durationDetails);
        if (this.durationDetails.duration.durationTime <= 0) {
          console.log("Invalid Time range");
          //this.presentAlert("End Time shall be after start time");
          this.invalidDates("Start time cannot be more than end time");
          this.duration = "00:00";
          this.inputsValidFlag = false;
        } else {
          this.inputsValidFlag = true;
          this.durationInHours = this.durationDetails.duration.durationInHours;
          this.durationInMins = this.durationDetails.duration.durationInMins;
          //this.totalNumberOfMins = 60 * this.durationInHours + this.durationInMins;
          this.totalNumberOfMins = (60 * +this.durationInHours) + (+this.durationInMins);
          this.energy = (this.power * this.totalNumberOfMins) / 60;
        }
      } else {
        this.duration = "00:00";
      }
    }
  }

  getEndTimeDetails() {
    this.formatTime(this.endTime, 'e');
    if (this.timeService.getDuration(this.endTimeFormatted, new Date().toISOString(), USER_ROLE).durationTime > 0) {
      this.invalidDates("Please select a future time.");
      this.duration = "00:00";
      this.inputsValidFlag = false;
      return;
    }
    this.durationDetails = this.timeService.getEndTimeDetails(this.startTimeFormatted, this.endTimeFormatted, USER_ROLE);
    if (this.durationDetails != null) {
      this.endTimeDetails = this.durationDetails.endTimeDetails;
      if (this.durationDetails.duration) {
        this.duration = this.durationDetails.duration.duration;
        console.log('duration object in end time : ' , this.durationDetails);
        if (this.durationDetails.duration.durationTime <= 0) {
          console.log("Invalid Time range");
          //this.presentAlert("End Time shall be after start time");
          this.invalidDates("Start time cannot be more than end time");
          this.duration = "00:00";
          this.inputsValidFlag = false;
        } else {
          this.inputsValidFlag = true;
          this.durationInHours = this.durationDetails.duration.durationInHours;
          this.durationInMins = this.durationDetails.duration.durationInMins;
          this.totalNumberOfMins = (60 * +this.durationInHours) + (+this.durationInMins);
          this.energy = (this.power * this.totalNumberOfMins) / 60;
        }
      }
    } else {
      this.duration = "00:00";
    }
  }

  proceedToSetRate() {
    this.callerPage='';
    if (this.inputsValidFlag) {
      this.router.navigate(['/sell-rate-set'], {
        queryParams: {
          action: this.action,
          sellOrderId: this.sellOrderId,
          sellerId: this.sellerId,
          userDeviceId: this.userDeviceId,
          deviceTypeId: this.deviceTypeId,
          power: this.power,
          energy: this.energy,
          //duration: this.duration,
          //startTime: this.startTimeDetails,
          //endTime: this.endTimeDetails
        }
      });
    } else {
      //this.presentAlert("Invalid Inputs");
      this.invalidInput();
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

  async invalidInput() {
    let defg = await this.modal.create({
      component: InvalidInputModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
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
    if(tag=='s') {
      this.startTimeFormatted=time;
    }
    if(tag=='e') {
      this.endTimeFormatted=time;
    }
  }
}

