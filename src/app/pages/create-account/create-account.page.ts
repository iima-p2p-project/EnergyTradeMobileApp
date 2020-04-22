import { NgModule, OnInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IngressService } from 'src/app/services/ingress.service';
import { ENABLE_SERVICES } from 'src/app/environments/environments';
import { AlertController, ToastController, MenuController } from '@ionic/angular';


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
  stateId: any;
  boardId: any;
  localityId: any;
  userRole: any;
  showOTPFlag: boolean = false;
  user: any;
  userId: any;
  responseFromService: any;

  constructor(private ingressService: IngressService
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private router: Router
    , private storage: Storage
    , private toastCtrl: ToastController
    , private menuController: MenuController) {

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
    this.menuController.swipeEnable(false);
    this.showOTPFlag = false;
    this.createAccountForm.controls['phoneNumber'].setValue("");
    this.createAccountForm.controls['fullName'].setValue("");
  }

  ionViewWillLeave() {
    this.menuController.swipeEnable(true);
  }

  continueToRegister() {
    this.fullName = this.createAccountForm.get('fullName').value;
    this.phoneNumber = this.createAccountForm.get('phoneNumber').value;
    this.otp = this.createAccountForm.get('otp').value;
    console.log(this.fullName);
    console.log(this.phoneNumber);
    console.log(this.otp);
    if (ENABLE_SERVICES) {
      this.ingressService.verifyOtp(this.phoneNumber, this.otp).subscribe((res) => {
        this.responseFromService = res;
        console.log('response from register service : ', this.responseFromService.response.key);
        //this.showToast(this.responseFromService.response.key);
        if (this.responseFromService.response.key == 200) {
          // this.userId = this.responseFromService.response.userId;
          // this.userRole = this.responseFromService.response.userRole;
          // this.ingressService.setLoggedInUserId(this.userId);
          // this.ingressService.loggedInUserRole = this.userRole;
          // this.ingressService.loggedInUserName = this.fullName;
          // this.storage.set('LoggedInUserRole', this.userRole);
          // this.storage.set('LoggedInUserName', this.fullName);
          // this.storage.set('LoggedInUserId', this.userId).then(() => {
          // this.ingressService.loggedInUserId = this.userId;
          this.router.navigate(['/register'], {
            queryParams: {
              phoneNumber: this.phoneNumber,
              fullName: this.fullName,
              redirect: this.redirect
            }
            // });
          });
        }
        if (this.responseFromService.response.key == 300) {
          console.log('OTP entered is incorrect');
        }
      });
    }
    else {
      this.router.navigate(['/register'], {
        queryParams: {
          phoneNumber: this.phoneNumber.toString(),
          fullName: this.fullName,
          redirect: this.redirect
        }
      });
    }
  }

  enableOTPField() {
    this.phoneNumber = this.createAccountForm.get('phoneNumber').value;
    if (this.phoneNumber.toString().length == 10) {
      if (ENABLE_SERVICES) {
        this.ingressService.sendOtp(this.phoneNumber.toString()).subscribe((res) => {
          this.responseFromService = res;
          console.log('server response from send otp : ', res);
          if (this.responseFromService.response.key == 300) {
            this.showOTPFlag = false;
            console.log('User Already Exists. Please Login');
            this.showToast('User Already Exists. Please Login');
          }
          if (/*this.responseFromService.response.key == 200*/ true) {
            this.showOTPFlag = true;
          }
        });
      }
    }
  }

  async showToast(message: string) {
    const toast7 = await this.toastCtrl.create({
      message: message,
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
