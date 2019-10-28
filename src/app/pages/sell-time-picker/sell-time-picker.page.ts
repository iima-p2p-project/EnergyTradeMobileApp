import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IonDatetime, Platform } from '@ionic/angular';
import { SellOrderPayload } from 'src/app/models/SellOrderPayload';
import * as moment from 'moment';
import { TimeService } from 'src/app/services/time.service';
 
@Component({
  selector: 'app-sell-time-picker',
  templateUrl: './sell-time-picker.page.html',
  styleUrls: ['./sell-time-picker.page.scss'],
})
export class SellTimePickerPage implements OnInit {
  
  //Used to determine screen size
  screenMode:any;
  screenWidth:any;

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
  deviceId: any;

  constructor(private router: Router,
    private platform:Platform,
     private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private timeService: TimeService) { 
      this.sellTimePickerForm = this.formBuilder.group({
        startTime: [null, Validators.required],
        endTime: [null, Validators.required],
        duration: [null, Validators.required]
      });

      //determine if screen is big or small
      this.screenWidth=platform.width();
      if(this.screenWidth>760)
      {
        this.screenMode="big"
      }
      else
      {
        this.screenMode="small";
      }
    }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      this.power = params['powerToSell'];
      this.sellerId = params['sellerId'];
      this.deviceId = params['deviceId'];
    });
  }

  getStartTimeDetails() {
    this.durationDetails = this.timeService.getStartTimeDetails(this.startTime,this.endTime);
    if(this.durationDetails != null) {
      this.startTimeDetails = this.durationDetails.startTimeDetails;
      this.duration = this.durationDetails.duration;
    }
  }

  getEndTimeDetails() {
    this.durationDetails = this.timeService.getEndTimeDetails(this.startTime,this.endTime);
    if(this.durationDetails != null) {
      this.endTimeDetails = this.durationDetails.endTimeDetails;
      this.duration = this.durationDetails.duration;
    }
  }

  proceedToSetRate() {
    this.router.navigate(['/sell-rate-set'], {
      queryParams: {
        sellerId: this.sellerId,
        deviceId: this.deviceId,
        power: this.power,
        //duration: this.duration,
        //startTime: this.startTimeDetails,
        //endTime: this.endTimeDetails
      }
    });
  }
}
