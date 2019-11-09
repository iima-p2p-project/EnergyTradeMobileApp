import { Component, OnInit } from '@angular/core';
import { TimeService } from 'src/app/services/time.service';
import { AdminService } from 'src/app/services/admin.service';
import { IngressService } from 'src/app/services/ingress.service';
import { NonTradeHourPayload } from 'src/app/models/NonTradeHourPayload';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { ADMIN_ROLE, ACTION_CREATE, ACTION_EDIT } from 'src/app/environments/environments';
import { LocalityModalPage } from '../modals/selectLocality';
import { ModalController } from '@ionic/angular';

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

  constructor(private timeService: TimeService
    , private ingressService: IngressService
    , private adminService: AdminService
    , private router: Router
    , private route: ActivatedRoute
    , public modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
      console.log('ACTION : ' , this.action);
      if(this.action==ACTION_EDIT) {
        this.adminStateId = params['stateId'];
        this.location = params['location'];
        this.startTime = params['startTime'];
        this.endTime = params['endTime'];
        this.nonTradeHourId = params['nonTradeHourId'];
        this.getStartTimeDetails();
        this.getEndTimeDetails();
        this.btnLabel = 'UPDATE CHANGES';
        this.header = 'EDIT';
      }
      if(this.action==ACTION_CREATE) {
        this.adminStateId = params['stateId'];
        this.btnLabel = 'SCHEDULE';
        this.header = 'SCHEDULE';
      }
      console.log('state id : ' , this.adminStateId);
    });
  }

  getStartTimeDetails() {
    this.durationDetails = this.timeService.getStartTimeDetails(this.startTime,this.endTime, ADMIN_ROLE);
    if(this.durationDetails != null) {
      this.startTimeDetails = this.durationDetails.startTimeDetails;
      this.duration = this.durationDetails.duration;
    }
  }

  getEndTimeDetails() {
    this.durationDetails = this.timeService.getEndTimeDetails(this.startTime,this.endTime, ADMIN_ROLE);
    if(this.durationDetails != null) {
      this.endTimeDetails = this.durationDetails.endTimeDetails;
      this.duration = this.durationDetails.duration;
    }
  }

  submit() {
    if(this.action==ACTION_EDIT) {
      this.nonTradeHourPayload.userId = this.ingressService.loggedInUserId;
      this.nonTradeHourPayload.startTime = this.timeService.startTime;
      this.nonTradeHourPayload.endTime = this.timeService.endTime;
      this.nonTradeHourPayload.localityId = this.selectedLocalityId.toString();
      this.nonTradeHourPayload.location = this.location;
      this.nonTradeHourPayload.nonTradeReason = this.reason;
      this.adminService.editNonTradeHour(this.nonTradeHourPayload, this.nonTradeHourId).subscribe((res) => {
        console.log('response from edit non trade hours service : ' , res);
      }); 
    }
    if(this.action==ACTION_CREATE) {
      this.nonTradeHourPayload.userId = this.ingressService.loggedInUserId.toString();
      this.nonTradeHourPayload.startTime = this.timeService.startTime;
      this.nonTradeHourPayload.endTime = this.timeService.endTime;
      this.nonTradeHourPayload.localityId = this.selectedLocalityId.toString();
      this.nonTradeHourPayload.location = this.location;
      this.nonTradeHourPayload.nonTradeReason = this.reason;
      this.adminService.createNonTradeHour(this.nonTradeHourPayload).subscribe((res) => {
        console.log('response from create non trade hours service : ' , res);
      }); 
    }
  }

  async openLocality_Modal() {
    const modal = await this.modalController.create({
      component: LocalityModalPage,
      componentProps: {
        'stateId': this.adminStateId
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log('locality data : ' , dataReturned);
        this.dataFromLocalityModal = dataReturned.data;
        this.selectedLocality = this.dataFromLocalityModal.selectedLocalityName;
        this.selectedLocalityId = this.dataFromLocalityModal.selectedLocalityId;
        this.location = this.selectedLocality;
      }
    });
    return await modal.present();
  }
}
