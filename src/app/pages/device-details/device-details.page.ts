import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IngressService } from 'src/app/services/ingress.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.page.html',
  styleUrls: ['./device-details.page.scss'],
})
export class DeviceDetailsPage implements OnInit {

  deviceDetailsForm: FormGroup;

  showSolar: boolean;
  showGenerator: boolean;
  showEV: boolean;

  devices: any[] = [];

  responseFromService: any;

  userId: any;

  constructor(private ingressService: IngressService
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private router: Router
    , private storage: Storage) {
    this.deviceDetailsForm = this.formBuilder.group({
      solar: [null, Validators.nullValidator],
      generator: [null, Validators.nullValidator],
      ev: [null, Validators.nullValidator]
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {

    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      console.log('user id : ', this.userId);
      if (params['showSolar'] == "true") {
        this.showSolar = true;
      }
      else {
        this.showSolar = false;
      }
      if (params['showGenerator'] == "true") {
        this.showGenerator = true;
      }
      else {
        this.showGenerator = false;
      }
      if (params['showEV'] == "true") {
        this.showEV = true;
      }
      else {
        this.showEV = false;
      }
    });

    if (this.showSolar) {
      this.deviceDetailsForm.controls['solar'].setValidators(Validators.required);
    }
    if (this.showGenerator) {
      this.deviceDetailsForm.controls['generator'].setValidators(Validators.required);
    }
    if (this.showEV) {
      this.deviceDetailsForm.controls['ev'].setValidators(Validators.required);
    }
  }

  addDevice() {
    if (this.showSolar) {
      this.devices.push({
        "deviceId": "1",
        "deviceCapacity": this.deviceDetailsForm.get('solar').value
      });
    }

    if (this.showGenerator) {
      this.devices.push({
        "deviceId": "2",
        "deviceCapacity": this.deviceDetailsForm.get('generator').value
      });
    }

    if (this.showEV) {
      this.devices.push({
        "deviceId": "3",
        "deviceCapacity": this.deviceDetailsForm.get('ev').value
      });
    }

    //this.router.navigateByUrl('/home');

    this.ingressService.addDevice({ "userId": this.userId, "devices": this.devices }).subscribe((res) => {
      this.responseFromService = res;
      console.log('add devices : ', res);
      if (this.responseFromService.response.key == 200) {
        this.ingressService.getUserDevices(this.userId).subscribe((res) => {
          console.log('user devices from server : ', res);
          this.responseFromService = res;
          this.ingressService.setUserDevices(this.responseFromService.response.devices);
          this.storage.set('LoggedInUserDevices', this.ingressService.getUserDevicesFromLocal());
          this.storage.set('LoggedInUserId', this.userId).then(() => {
            this.router.navigate(['/dashboard'], {
              queryParams: {
                userId: this.userId,
                //phoneNumber: this.phoneNumber,
                //redirect: this.redirect
              }
            });
          });
          // this.router.navigate(['/dashboard'], {
          //   queryParams: {
          //     showSolar: this.showSolar,
          //     solarCapacity: this.deviceDetailsForm.get('solar').value,
          //     showGenerator: this.showGenerator,
          //     generatorCapacity: this.deviceDetailsForm.get('generator').value,
          //     showEV: this.showEV,
          //     evCapacity: this.deviceDetailsForm.get('ev').value
          //   }});
        });
      }
    });
  }
}
