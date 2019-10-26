import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IonDatetime, Platform } from '@ionic/angular';

@Component({
  selector: 'app-sell-time-picker',
  templateUrl: './sell-time-picker.page.html',
  styleUrls: ['./sell-time-picker.page.scss'],
})
export class SellTimePickerPage implements OnInit {
  
  //Used to determine screen size
  screenMode:any;
  screenWidth:any;

  sellTimePickerForm: FormGroup;
  startTime: IonDatetime;
  endTime: IonDatetime;
  deviceName: string;
  duration: string;
  power: string;

  constructor(private router: Router,
    private platform:Platform,
     private route: ActivatedRoute
    , private formBuilder: FormBuilder) { 
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
      this.deviceName = params['deviceName'];
      this.power = params['power'];
    });
  }

  proceedToSetRate() {
    this.startTime = this.sellTimePickerForm.controls['startTime'].value;
    this.endTime = this.sellTimePickerForm.controls['endTime'].value;
    this.duration = this.sellTimePickerForm.controls['duration'].value;
    console.log(this.startTime);
    this.router.navigate(['/sell-rate-set'], {
      queryParams: {
        power: this.power,
        deviceName: this.deviceName,
        duration: this.duration,
        startTime: this.startTime,
        endTime: this.endTime
      }
    });
  }
}
