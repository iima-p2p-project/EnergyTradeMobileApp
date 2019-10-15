import { NgModule, OnInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IngressService } from 'src/app/servcies/ingress.service';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  createAccountForm: FormGroup;

  redirect: string = '/create-account';
  phoneNumber: string;
  fullName: string;
  otp: string;

  showOTPFlag: boolean = false;
  user: any;

  constructor(private ingressService: IngressService
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private router: Router
    , private storage: Storage) {

      this.createAccountForm = this.formBuilder.group({
        phoneNumber: [null, Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ])],
        fullName: [null, Validators.required],
        otp: [null, Validators.required],
      });
     }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.phoneNumber = params['phoneNumber'];
      this.redirect = params['redirect'];
    });
    this.showOTPFlag = false;
    this.createAccountForm.controls['phoneNumber'].setValue(this.phoneNumber);
    this.createAccountForm.controls['fullName'].setValue("");
  }

  continueToRegister() {
    this.fullName = this.createAccountForm.get('fullName').value;
    this.phoneNumber = this.createAccountForm.get('phoneNumber').value;
    this.otp = this.createAccountForm.get('otp').value;
    this.ingressService.login({phone: this.phoneNumber, otp: this.otp}).then((res) => {
      this.user = res;
      this.router.navigate(['/register'], {
        queryParams: {
          phoneNumber: this.phoneNumber,
          fullName: this.fullName,
          redirect: this.redirect
        }
      });
    });
  }
  
  enableOTPField() {
    this.phoneNumber = this.createAccountForm.get('phoneNumber').value;
    if(this.phoneNumber.length == 10) {
      this.ingressService.sendOtp(this.phoneNumber);
      this.showOTPFlag = true;
    }
  }
}
