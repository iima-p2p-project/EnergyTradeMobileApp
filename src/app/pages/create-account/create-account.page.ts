import { NgModule, OnInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IngressService } from 'src/app/services/ingress.service';
import { ENABLE_SERVICES } from 'src/app/environments/environments';
import { AlertController, ToastController } from '@ionic/angular';


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
  userId: any;
  responseFromService: any;

  constructor(private ingressService: IngressService
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private router: Router
    , private storage: Storage
    , private toastCtrl: ToastController) {

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
    /*this.route.queryParams.subscribe(params => {
      this.phoneNumber = params['phoneNumber'];
      this.redirect = params['redirect'];
    });*/
    this.showOTPFlag = false;
    this.createAccountForm.controls['phoneNumber'].setValue("");
    this.createAccountForm.controls['fullName'].setValue("");
  }

  continueToRegister() {
    this.fullName = this.createAccountForm.get('fullName').value;
    this.phoneNumber = this.createAccountForm.get('phoneNumber').value;
    this.otp = this.createAccountForm.get('otp').value;
    if(ENABLE_SERVICES) {
      this.ingressService.verifyOtp(this.phoneNumber, this.otp).subscribe((res) => {
        this.responseFromService = res;
        if(this.responseFromService.response.key == 200) {
          this.userId=this.responseFromService.response.userId;
          this.router.navigate(['/register'], {
            queryParams: {
              phoneNumber: this.phoneNumber,
              fullName: this.fullName,
              redirect: this.redirect
            }
          });
        }
        if(this.responseFromService.response.key == 300) {
          console.log('OTP entered is incorrect');
        }
      });
    }
    else {
      this.router.navigate(['/register'], {
        queryParams: {
          phoneNumber: this.phoneNumber,
          fullName: this.fullName,
          redirect: this.redirect
        }
      });
    } 
  }
  
  enableOTPField() {
    this.phoneNumber = this.createAccountForm.get('phoneNumber').value;
    if(this.phoneNumber.length == 10) {
      if(ENABLE_SERVICES) {
        this.ingressService.sendOtp(this.phoneNumber).subscribe((res) => {
          this.responseFromService=res;
          console.log('server response from send otp : ' , res);
          if(this.responseFromService.response.key == 300) {
            this.showOTPFlag = false;
            console.log('User Already Exists. Please Login');
            this.showToast();
          }
          if(this.responseFromService.response.key == 200) {
            this.showOTPFlag = true;
          }
        });
      }
    }
  }

  async showToast() {
    const toast7 = await this.toastCtrl.create({
      message: 'User Already Exists. Please Login.',
      duration: 3000,
    });
    toast7.present();
  }

  redirectToLogin() {
    this.router.navigate(['/login'], {
      queryParams: {}
    });
  }
}
