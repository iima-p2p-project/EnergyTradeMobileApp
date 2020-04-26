import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IngressService } from 'src/app/services/ingress.service';
import { RegisterPayload } from 'src/app/models/RegisterPayload';
import { ENABLE_SERVICES } from 'src/app/environments/environments'
import { ModalController } from '@ionic/angular';
import { StateModalPage } from '../modals/selectState';
import { LocalityModalPage } from '../modals/selectLocality';
import { BoardModalPage } from '../modals/selectBoard';
import { OneSignal } from '@ionic-native/onesignal/ngx';

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

  dataFromStateModal: any;
  dataFromBoardModal: any;
  dataFromLocalityModal: any;

  selectedState: string;
  selectedBoard: string;
  selectedLocality: string;

  selectedStateId: any;
  selectedBoardId: any;
  selectedLocalityId: any;


  constructor(private ingressService: IngressService
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private router: Router
    , private storage: Storage
    , public modalController: ModalController
    , private oneSignal: OneSignal
    , private menuController: MenuController) {

    this.registerForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      usn: [null, Validators.required],
      //stateList: [null, Validators.required],
      //boardList: [null, Validators.required],
    });
    this.selectedState = "";
    this.selectedBoard = "";
    this.selectedLocality = "";
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuController.swipeEnable(false);
    this.route.queryParams.subscribe(params => {
      this.phoneNumber = params['phoneNumber'];
      this.fullName = params['fullName'];
      this.redirect = params['redirect'];
    });
  }

  ionViewWillLeave() {
    this.menuController.swipeEnable(true);
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
    this.registerPayload.uniqueServiceNumber = this.registerForm.get('usn').value;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.stateId = this.selectedStateId;
    this.registerPayload.localityId = this.selectedLocalityId;
    this.registerPayload.boardId = this.selectedBoardId;
    if (ENABLE_SERVICES) {
      this.ingressService.register(this.registerPayload).subscribe((res) => {
        console.log('register response : ', res);
        this.resFromService = res;
        if (this.resFromService.response.key == 200 || this.resFromService.response.key == 500) {
          console.log('check2');
          this.registeredUser = res;
          this.ingressService.loggedInUserStateId = this.selectedStateId;
          this.ingressService.loggedInUserLocalityId = this.selectedLocalityId;
          this.ingressService.loggedInUserBoardId = this.selectedBoardId;
          this.ingressService.loggedInUserLocalityName = this.selectedLocality;
          this.storage.set('LoggedInUserStateId', this.selectedStateId);
          this.storage.set('LoggedInUserLocalityId', this.selectedLocalityId);
          this.storage.set('LoggedInUserLocalityName', this.selectedLocality);
          this.storage.set('LoggedInUserBoardId', this.selectedBoardId).then(() => {
            this.ingressService.setLoggedInUser(this.registeredUser);
            if (this.registeredUser != null) {
              this.ingressService.setLoggedInUserId(this.registeredUser.response.userId);
              //setting up onesignal notification identifier
              this.oneSignal.setExternalUserId(this.registeredUser.response.userId);
            }
            this.router.navigate(['/add-device'], {
              queryParams: {
                userId: this.registeredUser.response.userId,
                redirect: this.redirect
              }
            });
          });
        } else if (this.resFromService.response.key == 300) {
          window.alert("USN already exists.Please use a new USN number");
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

  async openState_Modal() {
    const modal = await this.modalController.create({
      component: StateModalPage,
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataFromStateModal = dataReturned.data;
        this.selectedState = this.dataFromStateModal.selectedStateName;
        this.selectedStateId = this.dataFromStateModal.selectedStateId;
      }
    });
    return await modal.present();
  }

  async openLocality_Modal() {
    const modal = await this.modalController.create({
      component: LocalityModalPage,
      componentProps: {
        'stateId': this.selectedStateId
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataFromLocalityModal = dataReturned.data;
        this.selectedLocality = this.dataFromLocalityModal.selectedLocalityName;
        this.selectedLocalityId = this.dataFromLocalityModal.selectedLocalityId;
      }
    });
    return await modal.present();
  }

  async openBoard_Modal() {
    const modal = await this.modalController.create({
      component: BoardModalPage,
      componentProps: {
        'stateId': this.selectedStateId
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataFromBoardModal = dataReturned.data;
        this.selectedBoard = this.dataFromBoardModal.selectedBoardName;
        console.log('first index of : ', this.selectedBoard.indexOf('('));
        console.log('last index of : ', this.selectedBoard.indexOf(')'));
        this.selectedBoard = this.selectedBoard.substring(this.selectedBoard.indexOf('(') + 1, this.selectedBoard.indexOf(')'));
        this.selectedBoardId = this.dataFromBoardModal.selectedBoardId;
      }
    });
    return await modal.present();
  }
}
