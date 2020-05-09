import { NgModule, OnInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IngressService } from 'src/app/services/ingress.service';
import { ENABLE_SERVICES } from 'src/app/environments/environments';
import { AlertController, ToastController, MenuController } from '@ionic/angular';
import { DRCustomerService } from 'src/app/services/drcustomer.service';
import { User } from 'src/app/models/User';
import { OneSignal } from '@ionic-native/onesignal/ngx';


@Component({
  selector: 'app-create-dr-user-account',
  templateUrl: './create-dr-user-account.page.html',
  styleUrls: ['./create-dr-user-account.page.scss'],
})
export class CreateDrUserAccountPage implements OnInit {

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
  drContractNumber: any;

  constructor(private ingressService: IngressService
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private router: Router
    , private storage: Storage
    , private toastCtrl: ToastController
    , private menuController: MenuController
    , private drCustomerService: DRCustomerService
    , private oneSignal: OneSignal) {

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
    this.route.queryParams.subscribe(params => {
      this.drContractNumber = params['drContractNumber'];
      this.redirect = params['redirect'];
    });
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
    this.ingressService.verifyOtp(this.phoneNumber, this.otp).subscribe((res) => {
      this.responseFromService = res;
      console.log('response from register service : ', this.responseFromService.response.key);
      if (this.responseFromService.response.key == 200) {
        this.userId = this.responseFromService.response.userId;
        // this.userRole = this.responseFromService.response.userRole;
        // this.ingressService.setLoggedInUserId(this.userId);
        // this.ingressService.loggedInUserRole = this.userRole;
        // this.ingressService.loggedInUserName = this.fullName;
        // this.storage.set('LoggedInUserRole', this.userRole);
        // this.storage.set('LoggedInUserName', this.fullName);
        // this.storage.set('LoggedInUserId', this.userId).then(() => {

        this.ingressService.loggedInUser.userId = this.userId;
        this.drCustomerService.updateDrCustomerDetails(this.fullName, this.phoneNumber, this.drContractNumber).subscribe((res: any) => {
          if (res.response.key == "200") {
            this.postLoginActions(res.response);
            // this.drCustomerService.getDRCustomerProfile(this.userId).subscribe((res: any) => {
            //   let userDetails = {} as any;
            //   userDetails.drContractNumber = res.response.drContractNumber;
            //   userDetails.phoneNumber = res.response.phoneNumber;
            //   userDetails.userName = res.response.fullName;
            //   userDetails.accessLevel = res.response.userRole;
            //   userDetails.userId = this.userId;
            //   this.ingressService.setLoggedInUser(userDetails);
            // this.ingressService.loggedInUser.drContractNumber = res.response.drContractNumber;
            // this.ingressService.loggedInUser.phoneNumber = res.response.phoneNumber;
            // this.ingressService.loggedInUser.userName = res.response.fullName;
            // let userTypes = res.response.userRole;
            // let userTypesArray = [];
            // for (let i = 0; i < userTypes.length; i++) {
            //   userTypesArray.push(userTypes[i].accessLevel);
            // }
            // this.ingressService.loggedInUser.userTypes = userTypesArray;
            //   this.router.navigateByUrl("/customer-dashboard");
            // }, (err) => {
            //   window.alert("Something went wron in getting customer profile.");
            // })

          } else {
            console.log("Something went wrong in dr customer update");
          }
          // });

        });
      }
      if (this.responseFromService.response.key == 300) {
        console.log('OTP entered is incorrect');
      }
    });


  }

  enableOTPField() {
    this.phoneNumber = this.createAccountForm.get('phoneNumber').value;
    if (this.phoneNumber.toString().length == 10) {
      if (ENABLE_SERVICES) {
        this.ingressService.sendRegistrationOTP(this.phoneNumber.toString(), "DR").subscribe((res) => {
          this.responseFromService = res;
          if (this.responseFromService.response.key == 200) {
            this.showOTPFlag = true;
          }
          else if (this.responseFromService.response.key == 300 && this.responseFromService.response.accessExist) {
            this.showOTPFlag = true;
          }
          else if (this.responseFromService.response.key == 300) {
            this.showOTPFlag = false;
            console.log('User Already Exists. Please Login');
            this.showToast('User Already Exists. Please Login');
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

  postLoginActions(response) {
    let userDetails = new User();
    userDetails.userId = response.userId;
    userDetails.phoneNumber = response.phoneNumber;
    userDetails.userName = response.name;
    userDetails.userRole = response.userRole;
    userDetails.userTypes = response.userTypes;
    this.ingressService.setLoggedInUser(userDetails);
    this.oneSignal.setExternalUserId("" + this.ingressService.loggedInUser.userId);
  }

}
