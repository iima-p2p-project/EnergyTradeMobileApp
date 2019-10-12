import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IngressService } from 'src/app/servcies/ingress.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
})
export class AddDevicePage implements OnInit {

  addDeviceForm: FormGroup;

  showSolar: boolean;
  showGenerator: boolean;
  showEV: boolean;

  constructor(private ingressService: IngressService
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private router: Router
    , private storage: Storage) { 
    this.addDeviceForm = this.formBuilder.group({
      solarFlag: [null, Validators.nullValidator],
      generatorFlag: [null, Validators.nullValidator],
      evFlag: [null, Validators.nullValidator]
    });
    this.showSolar = false;
    this.showGenerator = false;
    this.showEV = false;
  }

  ngOnInit() {
  }

  navigateToCapacityPage() {
    if(this.addDeviceForm.get('solarFlag').value) {
      this.showSolar = true;
    }
    if(this.addDeviceForm.get('generatorFlag').value) {
      this.showGenerator = true;
    }
    if(this.addDeviceForm.get('evFlag').value) {
      this.showEV = true;
    }
    this.router.navigate(['/device-details'], {
      queryParams: {
        showSolar: this.showSolar,
        showGenerator: this.showGenerator,
        showEV: this.showEV
      }
    });
  }

}
