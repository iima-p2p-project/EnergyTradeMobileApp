import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController, ToastController, MenuController } from '@ionic/angular';
import { IngressService } from 'src/app/services/ingress.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
})
export class AddDevicePage implements OnInit {

  addDeviceForm: FormGroup;

  userId: any;
  redirect: any;

  isSolarSelected: boolean;
  isGeneratorSelected: boolean;
  isEVSelected: boolean;

  constructor(private ingressService: IngressService
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private router: Router
    , private storage: Storage
    , private menuController: MenuController) { 
    this.addDeviceForm = this.formBuilder.group({
      solarFlag: [null, Validators.nullValidator],
      generatorFlag: [null, Validators.nullValidator],
      evFlag: [null, Validators.nullValidator]
    });
    this.isSolarSelected = false;
    this.isGeneratorSelected = false;
    this.isEVSelected = false;
  }


  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuController.swipeEnable(false);
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.redirect = params['redirect'];
    });
  }
  
  ionViewWillLeave() {
    this.menuController.swipeEnable(true);
  }

  skip() {
  }
  
  next(){
    this.router.navigate(['/device-details'], {
      queryParams: {
        userId: this.userId,
        showSolar: this.isSolarSelected,
        showGenerator: this.isGeneratorSelected,
        showEV: this.isEVSelected
      }
    });
  }

  SaveEnergySourcesDetails(){
    this.router.navigateByUrl('/home');
  }

  selectSolar() {
    if(!this.isSolarSelected) {
      document.getElementById("solarDiv").style.border = "solid #0049C6";
      this.isSolarSelected = true;
    }
    else {
      document.getElementById("solarDiv").style.border = "1px solid #989aa25e";
      this.isSolarSelected = false;
    }
  }

  selectGenerator() {
    if(!this.isGeneratorSelected) {
      document.getElementById("generatorDiv").style.border = "solid #0049C6";
      this.isGeneratorSelected = true;
    }
    else {
      document.getElementById("generatorDiv").style.border = "1px solid #989aa25e";
      this.isGeneratorSelected = false;
    }
  }

  selectEV() {
    if(!this.isEVSelected) {
      document.getElementById("evDiv").style.border = "solid #0049C6";
      this.isEVSelected = true;
    }
    else {
      document.getElementById("evDiv").style.border = "1px solid #989aa25e";
      this.isEVSelected = false;
    }
  }

}
