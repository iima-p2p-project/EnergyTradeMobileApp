import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IngressService } from 'src/app/services/ingress.service';
import { ENABLE_SERVICES, ADMIN_ROLE, USER_ROLE } from 'src/app/environments/environments';
import { IfStmt } from '@angular/compiler';

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
  stateId: any;
  boardId: any;
  localityId: any;
  userRole: any;
  userData: any;
  responseFromService: any;

  showOTPFlag: boolean = false;

  constructor(private ingressService: IngressService
    , private route: ActivatedRoute
    , private alertController: AlertController
    , private formBuilder: FormBuilder
    , private router: Router
    , private storage: Storage
    , private toastCtrl: ToastController) {

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
        console.log('login response : ' , this.responseFromService);
        this.userId = this.responseFromService.response.userId;
        this.stateId = this.responseFromService.response.stateId;
        this.boardId = this.responseFromService.response.boardId;
        this.localityId = this.responseFromService.response.localityId;
        this.userRole = this.responseFromService.response.userRole;
        this.ingressService.setLoggedInUserId(this.userId);
        this.ingressService.loggedInUserRole = this.userRole;
        this.ingressService.loggedInUserStateId = this.stateId;
        this.ingressService.loggedInUserLocalityId = this.localityId;
        this.ingressService.loggedInUserBoardId = this.boardId;
        this.ingressService.getUserDevices(this.userId).subscribe((res) => {
          this.responseFromService = res;
          this.ingressService.setUserDevices(this.responseFromService.response.devices);
          this.storage.set('LoggedInUserDevices', this.ingressService.userDevicesList);
          this.storage.set('LoggedInUserRole', this.userRole);
          this.storage.set('LoggedInUserStateId', this.stateId);
          this.storage.set('LoggedInUserLocalityId', this.localityId);
          this.storage.set('LoggedInUserBoardId', this.boardId);
          this.storage.set('LoggedInUserId', this.userId).then(() => {
            this.ingressService.printStorageKeyValue('LoggedInUserId');
            this.ingressService.printStorageKeyValue('LoggedInUserDevices');
            if(this.userRole == ADMIN_ROLE) {
              this.router.navigate(['/admin-dashboard'], {
                queryParams: {
                  userId: this.userId,
                  phoneNumber: this.phoneNumber,
                  redirect: this.redirect
                }
              });
            }
            if(this.userRole == USER_ROLE) {
              this.router.navigate(['/dashboard'], {
                queryParams: {
                  userId: this.userId,
                  phoneNumber: this.phoneNumber,
                  redirect: this.redirect
                }
              });
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
            this.showOTPFlag = false;
            this.showToast();
            console.log('User does not exist. Please register.')
          }
        });
      }
    }
  }

  async showToast() {
    const toast7 = await this.toastCtrl.create({
      message: 'User does not exist. Please register.',
      duration: 3000,
    });
    toast7.present();
  }

  redirectToRegister() {
    this.router.navigate(['/create-account'], {
      queryParams: {}
    });
  }

}
