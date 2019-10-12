import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IngressService } from 'src/app/servcies/ingress.service';

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
    if(params['showSolar'] == "true") {
      this.showSolar = true;
    }
    else {
      this.showSolar = true;
    }
    if(params['showGenerator'] == "true") {
      this.showGenerator = true;
    }
    else {
      this.showGenerator = false;
    }
    if(params['showEV'] == "true") {
      this.showEV = true;
    }
    else {
      this.showEV = false;
    }
    });
    
    console.log('solar : ', this.showSolar);
    console.log('generator : ', this.showGenerator);
    console.log('ev : ', this.showEV);
    
  //  window.dispatchEvent(new Event('resize'));
    /*if(this.showSolar) {
      this.deviceDetailsForm.controls['solar'].setValidators(Validators.required);
    }
    if(this.showGenerator) {
      this.deviceDetailsForm.controls['generator'].setValidators(Validators.required);
    }
    if(this.showEV) {
      this.deviceDetailsForm.controls['ev'].setValidators(Validators.required);
    }*/
  }
}
