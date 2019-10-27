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
  duration: any;

  sellOrderPayload: SellOrderPayload = {};
  sellTimePickerForm: FormGroup;
  startTime: string;
  endTime: string;
  deviceName: string;
  // duration: string;
  power: number;

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
    });
  }

  getDuration() {
    this.duration = this.timeService.getDuration(this.startTime,this.endTime);
    this.durationInHours = this.duration.durationInHours;
    this.durationInMins = this.duration.durationInMins;
  }

  proceedToSetRate() {
    
    this.timeService.getDuration(this.startTime, this.endTime);

    // this.router.navigate(['/sell-rate-set'], {
    //   queryParams: {
    //     power: this.power,
    //     deviceName: this.deviceName,
    //     duration: this.duration,
    //     startTime: this.startTime,
    //     endTime: this.endTime
    //   }
    // });
  }
}
