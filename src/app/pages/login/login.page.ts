import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IngressService } from 'src/app/servcies/ingress.service';
import { ENABLE_SERVICES } from 'src/app/environments/environments';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  redirect: string = '/login';
  phoneNumber: string;
  otp: string;

  userId: any;
  userData: any;
  responseFromService: any;

  showOTPFlag: boolean = false;

  constructor(private ingressService: IngressService
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private router: Router
    , private storage: Storage) {

    this.loginForm = this.formBuilder.group({
      phoneNumber: [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ])],
      otp: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.loginForm.controls['phoneNumber'].setValue("");
    this.loginForm.controls['otp'].setValue("");
  }

  ionViewDidEnter() {
    /*this.route.queryParams.subscribe(params => {
      this.phoneNumber = params['phoneNumber'];
      this.redirect = params['redirect'];
    });*/
    this.showOTPFlag = false;
    this.loginForm.controls['phoneNumber'].setValue("");
  }

  login() {
    this.phoneNumber = this.loginForm.get('phoneNumber').value;
    this.otp = this.loginForm.get('otp').value;
    var verifyUserPayload = {
      "loginMode": "P",
      "phoneNum": this.phoneNumber
    }
    this.ingressService.verifyOtp(this.phoneNumber, this.otp).subscribe((res) => {
      this.responseFromService = res;
      if (this.responseFromService.response.key == 200) {
        this.userId = this.responseFromService.response.userId;
        this.storage.set('LoggedInUserId', this.userId).then(() => {
          this.router.navigate(['/home'], {
            queryParams: {
              phoneNumber: this.phoneNumber,
              callerPage: this.redirect
            }
          });
        });
      }
      else if (this.responseFromService.response.key == 300) {
        console.log('Wrong OTP');
      }
    });
  }

  enableOTPField() {
    this.phoneNumber = this.loginForm.get('phoneNumber').value;
    if(this.phoneNumber.length == 10) {
      if(ENABLE_SERVICES) {
        this.ingressService.generateOtp(this.phoneNumber).subscribe((res) => {
          this.responseFromService = res;
          if(this.responseFromService.response.key == 200) {
            this.showOTPFlag = true;
          }
          if(this.responseFromService.response.key == 300) {
            console.log('User does not exist. Please register.')
          }
        });
      }
    }
  }

  redirectToRegister() {
    this.router.navigate(['/create-account'], {
      queryParams: {}
    });
  }

}
