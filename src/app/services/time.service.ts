import { ENABLE_SERVICES, ADMIN_ROLE, USER_ROLE } from 'src/app/environments/environments';
import { Injectable } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
// import { start } from 'repl';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  durationInHours: any;
  durationInMins: any;
  startTimeDetails: string;
  endTimeDetails: string;
  dayDiff: number;
  hourDiff: number;
  minDiff: number;

  duration: any = "00:00";

  isStartTimeSelected: boolean;
  isEndTimeSelected: boolean;

  startTime: any;
  endTime: any;

  constructor() { }

  getDuration(startTime: string, endTime: string, userRole: string) {
    if (userRole == ADMIN_ROLE) {
      if (this.startTime != null) {
        this.startTime = startTime.substring(0, 10) + ' ' + startTime.substring(11, 16) + ':00';
      }
      if (this.endTime != null) {
        this.endTime = endTime.substring(0, 10) + ' ' + endTime.substring(11, 16) + ':00';
      }
    }
    if (userRole == USER_ROLE) {
      if (this.startTime != null) {
        this.startTime = startTime.substring(0, 17) + '00.000';
      }
      if (this.endTime != null) {
        this.endTime = endTime.substring(0, 17) + '00.000';
      }
    }
    var duration = moment.duration(moment(endTime).diff(moment(startTime)));
    this.dayDiff = duration.asDays();
    this.hourDiff = duration.asHours();
    this.minDiff = Math.round(duration.asMinutes());
    this.durationInHours = Math.floor(this.minDiff / 60);
    this.durationInMins = this.minDiff % 60;

    if (parseInt(this.durationInHours) < 10) {
      this.durationInHours = '0' + this.durationInHours;
    }
    if (parseInt(this.durationInMins) < 10) {
      this.durationInMins = '0' + this.durationInMins;
    }

    this.duration = this.durationInHours + ":" + this.durationInMins;
    return {
      duration: this.duration
      , durationTime: this.minDiff
    }
  }

  getStartTimeDetails(startTime: string, endTime: string, userRole: string) {
    let durationObject;
    this.startTime = startTime;
    this.startTimeDetails = moment(startTime).format('ddd, DD MMM');
    //console.log('start time display : ' , moment(startTime).format('hh:mm A'));
    this.startTimeDetails = this.startTimeDetails.toUpperCase();
    this.isStartTimeSelected = true;
    if (this.isStartTimeSelected && this.isEndTimeSelected) {
      durationObject = this.getDuration(startTime, endTime, userRole);
    }
    return {
      startTimeDetails: this.startTimeDetails
      , duration: durationObject
    };
  }

  getEndTimeDetails(startTime: string, endTime: string, userRole: string) {
    let durationObject;
    this.endTime = endTime;
    this.endTimeDetails = moment(endTime).format('ddd, DD MMM');
    this.endTimeDetails = this.endTimeDetails.toUpperCase();
    this.isEndTimeSelected = true;
    if (this.isStartTimeSelected && this.isEndTimeSelected) {
      durationObject = this.getDuration(startTime, endTime, userRole);
    }
    return { endTimeDetails: this.endTimeDetails, duration: durationObject };
  }
}
