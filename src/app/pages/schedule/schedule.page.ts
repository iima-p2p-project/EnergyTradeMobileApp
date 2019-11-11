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
        if (this.durationDetails.duration.durationTime <= 0) {
          console.log("Invalid Time range");
          this.presentAlert("End Time shall be after start time");
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
      this.startTimeDetails = this.durationDetails.startTimeDetails;
      if (this.durationDetails.duration) {
        this.duration = this.durationDetails.duration.duration;
        if (this.durationDetails.duration.durationTime <= 0) {
          console.log("Invalid Time range");
          this.presentAlert("End Time shall be after start time");
          this.duration = "00:00";
          this.inputsValidFlag = false;
        } else {
          this.inputsValidFlag = true;
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
      this.adminService.editNonTradeHour(this.nonTradeHourPayload, this.nonTradeHourId).subscribe((res) => {
        console.log('response from edit non trade hours service : ', res);
      });
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
}
