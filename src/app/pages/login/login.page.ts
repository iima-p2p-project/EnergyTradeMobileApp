import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController, ToastController, MenuController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IngressService } from 'src/app/services/ingress.service';
import { ENABLE_SERVICES, ADMIN_ROLE, USER_ROLE } from 'src/app/environments/environments';
import { IfStmt } from '@angular/compiler';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { User } from 'src/app/models/User';
import { UserP2PDetails } from 'src/app/models/UserP2PDetails';

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
    , private menuController: MenuController
    , private events: Events) {

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
    // var verifyUserPayload = {
    //   "loginMode": "P",
    //   "phoneNum": this.phoneNumber.toString()
    // }
    this.ingressService.login(this.phoneNumber, this.otp).subscribe((res) => {
      this.responseFromService = res;
      if (this.responseFromService.response.key == 200) {
        console.log('login response : ', this.responseFromService);
        this.postLoginActions(this.responseFromService.response);
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
        this.ingressService.sendLoginOTP(this.phoneNumber.toString()).subscribe((res) => {
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

  postLoginActions(response) {
    let userDetails = new User();
    userDetails.userId = response.userId;
    userDetails.phoneNumber = response.phoneNumber;
    userDetails.userName = response.name;
    userDetails.userRole = response.userRole;
    userDetails.userTypes = response.userTypes;
    this.ingressService.setLoggedInUser(userDetails);
    this.userId = this.ingressService.loggedInUser.userId;
    this.ingressService.getp2pUserProfile(this.userId).subscribe((res: any) => {
      this.ingressService.setP2PUserDetails(res.response);
      this.ingressService.setP2PUserDevices(res.response.devices);
      this.events.publish("user:loggedin");
    });
    this.oneSignal.setExternalUserId(this.userId);
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
            phoneNumber: this.ingressService.loggedInUser.phoneNumber,
            redirect: this.redirect
          }
        });
      } else if (this.ingressService.loggedInUser.userTypes.includes("DR")) {
        this.router.navigate(['/customer-dashboard'], {
          queryParams: {
            userId: this.userId,
            phoneNumber: this.ingressService.loggedInUser.phoneNumber,
            redirect: this.redirect
          }
        });
      }
    }

  }

}
