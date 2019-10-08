import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IngressService } from 'src/app/servcies/ingress.service';

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

  userData: any;

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

  login() {
    this.phoneNumber = this.loginForm.get('phoneNumber').value;
    var verifyUserPayload = {
      "loginMode": "P",
      "phoneNum": this.phoneNumber
    }
    this.ingressService.login(verifyUserPayload).subscribe((resp) => {
      console.log('response from login : ' , resp);
      this.userData = resp;
      if (this.userData.recordStatus === 1) {
        this.storage.set('LoggedInUser', this.userData.userId);
        this.storage.set('allUserData', this.userData).then(() => {
          this.router.navigateByUrl('/home');
        });
      }
      else if (this.userData.recordStatus === 2) {
        this.router.navigate(['/create-account'], {
          queryParams: {
            phoneNumber: this.phoneNumber,
            callerPage: this.redirect
          }
        });
      }
    });
  }
}