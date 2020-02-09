import { Component, OnInit } from '@angular/core';
import { TimeService } from 'src/app/services/time.service';
import { AdminService } from 'src/app/services/admin.service';
import { IngressService } from 'src/app/services/ingress.service';
import { NonTradeHourPayload } from 'src/app/models/NonTradeHourPayload';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { ADMIN_ROLE, ACTION_CREATE, ACTION_EDIT } from 'src/app/environments/environments';
import { LocalityModalPage } from '../modals/selectLocality';
import { ModalController, AlertController } from '@ionic/angular';
import { NonTradePostSuccessPage } from '../non-trade-post-success/non-trade-post-success.page';
import { NonTradeHoursAlertPage } from 'src/app/non-trade-hours-alert/non-trade-hours-alert.page';
import { InvalidInputModalPage } from 'src/app/invalid-input-modal/invalid-input-modal.page';
import { EndDateModalPage } from 'src/app/end-date-modal/end-date-modal.page';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  adminStateId: any;
  nonTradeHourId: any;
  durationInHours: any = '00';
  durationInMins: any = '00';
  durationDetails: any;
  duration: any = "00:00";
  startTime: string;
  endTime: string;
  startTimeDetails: any = "DAY,DD MM";
  endTimeDetails: any = "DAY,DD MM";
  location: any;
  reason: any;
  action: any;
  callerPage: string;

  btnLabel: any;
  header: any;

  dataFromLocalityModal: any;
  selectedLocality: string;
  selectedLocalityId: number;

  nonTradeHourPayload: NonTradeHourPayload = {};

  inputsValidFlag = false;

  constructor(private timeService: TimeService
    , private ingressService: IngressService
    , private adminService: AdminService
    , private router: Router
    , private route: ActivatedRoute
    , public modalController: ModalController
    , private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
      console.log('ACTION : ', this.action);
      if (this.action == ACTION_EDIT) {
        this.adminStateId = params['stateId'];
        this.location = params['localityName'];
        this.selectedLocalityId = params['localityId'];
        this.startTime = params['startTime'];
        this.endTime = params['endTime'];
        this.nonTradeHourId = params['nonTradeHourId'];
        this.getStartTimeDetails();
        this.getEndTimeDetails();
        this.btnLabel = 'UPDATE CHANGES';
        this.header = 'EDIT';
      }
      if (this.action == ACTION_CREATE) {
        this.adminStateId = params['stateId'];
        this.btnLabel = 'SCHEDULE';
        this.header = 'SCHEDULE';
        this.callerPage = params['callerPage'];
        if(this.callerPage=='admin-dashboard') {
          this.timeService.startTime=null;
          this.timeService.endTime=null;
          this.timeService.isStartTimeSelected=false;
          this.timeService.isEndTimeSelected=false;
        }
      }
      console.log('state id : ', this.adminStateId);
    });
  }

  getStartTimeDetails() {
    this.durationDetails = this.timeService.getStartTimeDetails(this.startTime, this.endTime, ADMIN_ROLE);
    if (this.durationDetails != null) {
      this.startTimeDetails = this.durationDetails.startTimeDetails;
      if (this.durationDetails.duration) {
        this.duration = this.durationDetails.duration.duration;
        console.log('duration object in start time : ' , this.durationDetails);
        if (this.durationDetails.duration.durationTime <= 0) {
          console.log("Invalid Time range");
          //this.presentAlert("End Time shall be after start time");
          this.invalidDates();
          this.duration = "00:00";
          this.inputsValidFlag = false;
        } else {
          this.inputsValidFlag = true;
        }
      }
      else {
        this.duration = "00:00";
      }
      // this.startTimeDetails = this.durationDetails.startTimeDetails;
      // this.duration = this.durationDetails.duration;
    }
  }

  getEndTimeDetails() {
    this.durationDetails = this.timeService.getEndTimeDetails(this.startTime, this.endTime, ADMIN_ROLE);
    if (this.durationDetails != null) {
      this.endTimeDetails = this.durationDetails.endTimeDetails;
      if (this.durationDetails.duration) {
        this.duration = this.durationDetails.duration.duration;
        console.log('duration object in start time : ' , this.durationDetails);
        if (this.durationDetails.duration.durationTime <= 0) {
          console.log("Invalid Time range");
          //this.presentAlert("End Time shall be after start time");
          this.invalidDates();
          this.duration = "00:00";
          this.inputsValidFlag = false;
        } else {
          if(this.endTime!=null) {
            this.inputsValidFlag = true;
          }
        }
      }
      else {
        this.duration = "00:00";
      }
      // this.endTimeDetails = this.durationDetails.endTimeDetails;
      // this.duration = this.durationDetails.duration;
    }
  }

  submit() {
    if(this.location==null || this.reason==null || this.reason==''  || this.reason==' ') {
      //this.presentAlert('Enter Location');
      this.invalidInput();
      return;
    }
    if (this.action == ACTION_EDIT) {
      if (this.ingressService.loggedInUserId != null) {
        this.nonTradeHourPayload.userId = this.ingressService.loggedInUserId;
      }
      this.nonTradeHourPayload.startTime = this.timeService.startTime;
      this.nonTradeHourPayload.endTime = this.timeService.endTime;
      if (this.selectedLocalityId != null) {
        this.nonTradeHourPayload.localityId = this.selectedLocalityId.toString();
      }
      this.nonTradeHourPayload.location = this.location;
      this.nonTradeHourPayload.nonTradeReason = this.reason;
      this.presentEditSuccessModal(this.nonTradeHourId, this.nonTradeHourPayload);
    }
    if (this.action == ACTION_CREATE) {
      if (this.ingressService.loggedInUserId != null) {
        this.nonTradeHourPayload.userId = this.ingressService.loggedInUserId;
      }
      this.nonTradeHourPayload.startTime = this.timeService.startTime;
      this.nonTradeHourPayload.endTime = this.timeService.endTime;
      if (this.selectedLocalityId != null) {
        this.nonTradeHourPayload.localityId = this.selectedLocalityId.toString();
      }
      this.nonTradeHourPayload.location = this.location;
      this.nonTradeHourPayload.nonTradeReason = this.reason;
      this.adminService.createNonTradeHour(this.nonTradeHourPayload).subscribe((res) => {
        console.log('response from create non trade hours service : ', res);
      });
      this.presentCreateSuccessModal();
    }
  }

  async openLocality_Modal() {
    if (this.action == ACTION_EDIT) {
      return;
    }
    const modal = await this.modalController.create({
      component: LocalityModalPage,
      componentProps: {
        'stateId': this.adminStateId
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log('locality data : ', dataReturned);
        this.dataFromLocalityModal = dataReturned.data;
        this.selectedLocality = this.dataFromLocalityModal.selectedLocalityName;
        this.selectedLocalityId = this.dataFromLocalityModal.selectedLocalityId;
        this.location = this.selectedLocality;
      }
    });
    return await modal.present();
  }

  async presentAlert(alertmsg) {
    const alert = await this.alertController.create({
      message: alertmsg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentCreateSuccessModal(){
    const myModal = await this.modalController.create({
      component: NonTradePostSuccessPage,
      cssClass: 'my-custom-modal-small-css'
    });
    return await myModal.present();
  }

  async presentEditSuccessModal(nonTradeHourId: any, nonTradeHourPayload: any){
    const myModal = await this.modalController.create({
      component: NonTradeHoursAlertPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        'orderId': nonTradeHourId,
        'orderPayload' : nonTradeHourPayload,
        'orderType': 'NONTRADEHOUR'
      }
    });
    myModal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if(dataReturned.data!==null) {
          if(dataReturned.data.action=='YES'){
            this.router.navigate(['/admin-dashboard'], {
              queryParams: {
              }
            });
          }
        }
      }
    });
    return await myModal.present();
  }

  async invalidInput() {
    let defg = await this.modalController.create({
      component: InvalidInputModalPage,
      cssClass: 'input-field-validation-custom-modal-css',
      componentProps: {
        errorDescription: 'Please make sure you have entered values for all the input fields.'
      }
    });
    return await defg.present();
  }

  async invalidDates() {
    let defg = await this.modalController.create({
      component: EndDateModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
      }
    });
    return await defg.present();
  }
}
