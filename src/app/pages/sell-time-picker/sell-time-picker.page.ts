import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IonDatetime, Platform, AlertController } from '@ionic/angular';
import { SellOrderPayload } from 'src/app/models/SellOrderPayload';
import * as moment from 'moment';
import { TimeService } from 'src/app/services/time.service';
import { USER_ROLE, ACTION_CREATE, ACTION_EDIT } from 'src/app/environments/environments';

@Component({
  selector: 'app-sell-time-picker',
  templateUrl: './sell-time-picker.page.html',
  styleUrls: ['./sell-time-picker.page.scss'],
})
export class SellTimePickerPage implements OnInit {

  //Used to determine screen size
  screenMode: any;
  screenWidth: any;

  durationInHours: any = '00';
  durationInMins: any = '00';
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
  power: number;

  sellerId: any;
  userDeviceId: any;
  deviceTypeId: any;
  inputsValidFlag = false;

  sellOrderId: any;
  action: any;

  constructor(private router: Router,
    private platform: Platform,
    private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private timeService: TimeService
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
    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
      if(this.action == ACTION_CREATE) {
        this.power = params['powerToSell'];
        this.sellerId = params['sellerId'];
        this.userDeviceId = params['userDeviceId'];
        this.deviceTypeId = params['deviceTypeId'];
      }
      if(this.action == ACTION_EDIT) {
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
      console.log('sell time picker user device id : ', this.userDeviceId);
      console.log('sell time picker device type id : ', this.deviceTypeId);
      console.log('sell time picker seller id : ', this.sellerId);
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
        console.log("Start here");
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
        this.presentAlert("End Time cant be before start time");
        this.duration = "00:00";
        this.inputsValidFlag = false;
      } else {
        this.inputsValidFlag = true;
        console.log("End here",this.inputsValidFlag);
      }
    }
  }

  proceedToSetRate() {
    if (this.inputsValidFlag) {
      this.router.navigate(['/sell-rate-set'], {
        queryParams: {
          action: this.action,
          sellOrderId: this.sellOrderId,
          sellerId: this.sellerId,
          userDeviceId: this.userDeviceId,
          deviceTypeId: this.deviceTypeId,
          power: this.power,
          //duration: this.duration,
          //startTime: this.startTimeDetails,
          //endTime: this.endTimeDetails
        }
      });
    } else {
      this.presentAlert("Invalid Inputs");
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
}

