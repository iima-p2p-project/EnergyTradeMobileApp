import { Component, OnInit } from '@angular/core';
import { TimeService } from 'src/app/services/time.service';
import { AdminService } from 'src/app/services/admin.service';
import { IngressService } from 'src/app/services/ingress.service';
import { NonTradeHourPayload } from 'src/app/models/NonTradeHourPayload';
import * as moment from 'moment';
import { ENABLE_SERVICES, ADMIN_ROLE, USER_ROLE } from 'src/app/environments/environments';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
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

  nonTradeHourPayload: NonTradeHourPayload = {};

  constructor(private timeService: TimeService
    , private ingressService: IngressService
    , private adminService: AdminService) { }

  ngOnInit() {
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

  createNonTradeHour() {
    this.nonTradeHourPayload.userId = this.ingressService.loggedInUserId.toString();
    this.nonTradeHourPayload.startTime = this.timeService.startTime;
    this.nonTradeHourPayload.endTime = this.timeService.endTime;
    this.nonTradeHourPayload.location = this.location;
    this.nonTradeHourPayload.nonTradeReason = this.reason;
    this.adminService.createNonTradeHour(this.nonTradeHourPayload).subscribe((res) => {
      console.log('response from create non trade hours service : ' , res);
    }); 
  }
}
