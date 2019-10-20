import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-sell-time-picker',
  templateUrl: './sell-time-picker.page.html',
  styleUrls: ['./sell-time-picker.page.scss'],
})
export class SellTimePickerPage implements OnInit {

  sellTimePickerForm: FormGroup;
  startTime: IonDatetime;
  endTime: IonDatetime;
  deviceName: string;
  duration: string;
  power: string;

  constructor(private router: Router
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder) { 
      this.sellTimePickerForm = this.formBuilder.group({
        startTime: [null, Validators.required],
        endTime: [null, Validators.required],
        duration: [null, Validators.required]
      });
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
