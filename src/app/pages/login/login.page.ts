import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController, ToastController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IngressService } from 'src/app/services/ingress.service';
import { ENABLE_SERVICES, ADMIN_ROLE, USER_ROLE } from 'src/app/environments/environments';
import { IfStmt } from '@angular/compiler';
import { OneSignal } from '@ionic-native/onesignal/ngx';

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
  localityName: any;
  userRole: any;
  userTypes: string[] = [];
  userData: any;
  userName: any;
  responseFromService: any;

  showOTPFlag: boolean = false;

  constructor(private ingressService: IngressService
    , private route: ActivatedRoute
    , private alertController: AlertController
    , private formBuilder: FormBuilder
    , private router: Router
    , private storage: Storage
    , private toastCtrl: ToastController
    , private oneSignal: OneSignal
    , private menuController: MenuController) {

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
    this.menuController.swipeEnable(false);
    this.showOTPFlag = false;
    this.loginForm.controls['phoneNumber'].setValue("");
  }

  ionViewWillLeave() {
    this.menuController.swipeEnable(true);
  }

  login() {
    this.phoneNumber = this.loginForm.get('phoneNumber').value;
    this.otp = this.loginForm.get('otp').value;
    var verifyUserPayload = {
      "loginMode": "P",
      "phoneNum": this.phoneNumber.toString()
    }
    this.ingressService.login(this.phoneNumber, this.otp).subscribe((res) => {
      this.responseFromService = res;
      if (this.responseFromService.response.key == 200) {
        console.log('login response : ', this.responseFromService);
        // this.userId = this.responseFromService.response.userId;
        // this.stateId = this.responseFromService.response.stateId;
        // this.boardId = this.responseFromService.response.boardId;
        // this.localityId = this.responseFromService.response.localityId;
        // for (let i = 0; i < this.responseFromService.response.accessLevel.length; i++) {
        //   let userType = this.responseFromService.response.accessLevel[i].accessLevel
        //   this.userTypes.push(userType);
        // }
        // this.userRole = this.responseFromService.response.userRole;
        // this.localityName = this.responseFromService.response.localityName;
        // this.userName = this.responseFromService.response.userName;
        //setting user io for as notification identifier for onesignal
        this.oneSignal.setExternalUserId(this.userId);
        this.ingressService.setLoggedInUser(this.responseFromService.response);

        // this.storage.set('LoggedInUserDevices', this.ingressService.userDevicesList);
        // this.storage.set('LoggedInUserRole', this.userRole);
        // this.storage.set('LoggedInUserStateId', this.stateId);
        // this.storage.set('LoggedInUserLocalityId', this.localityId);
        // this.storage.set('LoggedInUserBoardId', this.boardId);
        // this.storage.set('LoggedInUserLocalityName', this.localityName);
        // this.storage.set('LoggedInUserName', this.userName);
        // this.storage.set('LoggedInUserTypes', this.userTypes);


        if (this.ingressService.loggedInUser.userRole == ADMIN_ROLE) {
          this.router.navigate(['/admin-dashboard'], {
            queryParams: {
              userId: this.userId,
              phoneNumber: this.phoneNumber,
              redirect: this.redirect
            }
          });
        } else if (this.ingressService.loggedInUser.userRole == USER_ROLE) {
          if (this.ingressService.loggedInUser.userTypes.includes("P2P")) {
            this.router.navigate(['/dashboard'], {
              queryParams: {
                userId: this.userId,
                phoneNumber: this.phoneNumber,
                redirect: this.redirect
              }
            });
          } else if (this.ingressService.loggedInUser.userTypes.includes("DR")) {
            this.router.navigate(['/customer-dashboard'], {
              queryParams: {
                userId: this.userId,
                phoneNumber: this.phoneNumber,
                redirect: this.redirect
              }
            });
          }
        }
      }
      else if (this.responseFromService.response.key == 300) {
        console.log('Wrong OTP');
      }
    });
  }

  enableOTPField() {
    this.phoneNumber = this.loginForm.get('phoneNumber').value;
    if (this.phoneNumber.toString().length == 10) {
      if (ENABLE_SERVICES) {
        this.ingressService.generateOtp(this.phoneNumber.toString()).subscribe((res) => {
          this.responseFromService = res;
          if (this.responseFromService.response.key == 200) {
            this.showOTPFlag = true;
            this.loginForm.controls['otp'].setValue("");
          }
          if (this.responseFromService.response.key == 300) {
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
    this.router.navigate(['/choose-user-type'], {
      queryParams: {}
    });
  }

}
