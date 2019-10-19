import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IngressService } from 'src/app/servcies/ingress.service';
import { RegisterPayload } from 'src/app/models/RegisterPayload';
import { ENABLE_SERVICES } from 'src/app/environments/environments'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  redirect: string = '/login';
  phoneNumber: string;
  fullName: string;
  email: string;
  otp: string;

  resFromService: any;
  boards: any[]; 
  states: any[];

  registeredUser: any;

  registerPayload: RegisterPayload = {};


  constructor(private ingressService: IngressService
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private router: Router
    , private storage: Storage) { 

      this.registerForm = this.formBuilder.group({
        email: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        stateList: [null, Validators.required],
        boardList: [null, Validators.required],
      });
    }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.phoneNumber = params['phoneNumber'];
      this.fullName = params['fullName'];
      this.redirect = params['redirect'];
    });
  }

  getBoardsPostStateSelection() {
    /*this.ingressService.getBoardsFromSelectedState(this.registerForm.get('stateList').value).subscribe((res) => {
      this.resFromService = res;
      this.boards = this.resFromService.response;
    });*/
  }

  register() {
    this.registerPayload.phone = this.phoneNumber;
    this.registerPayload.fullName = this.fullName;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.stateId = this.registerForm.get('stateList').value;
    this.registerPayload.boardId = this.registerForm.get('boardList').value;
    if(ENABLE_SERVICES) {
      this.ingressService.register(this.registerPayload).subscribe((res) => {
        console.log(res);
        this.resFromService = res;
        if(this.resFromService.response.key == 200) {
          console.log('check2');
          this.registeredUser = res;
          this.storage.set('USER', this.registeredUser).then(() => {
            this.ingressService.setLoggedInUser(this.registeredUser);
            if(this.registeredUser != null) {
              this.ingressService.setLoggedInUserId(this.registeredUser.userId);
            }
            this.router.navigate(['/add-device'], {
              queryParams: {
                userId: this.registeredUser.userId,
                redirect: this.redirect
              }
            });
          });
        }
      });
    }
    else {
      this.router.navigate(['/add-device'], {
        queryParams: {
          //userId: this.registeredUser.userId,
          redirect: this.redirect
        }
      });
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login'], {
      queryParams: {}
    });
  }
  
}
