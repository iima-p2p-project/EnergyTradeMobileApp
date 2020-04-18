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
      if (startTime != null) {
        this.startTime = startTime.substring(0, 10) + ' ' + startTime.substring(11, 16) + ':00';
      }
      if (endTime != null) {
        this.endTime = endTime.substring(0, 10) + ' ' + endTime.substring(11, 16) + ':00';
      }
    }
    // if (userRole == USER_ROLE) {
    //   if (this.startTime != null) {
    //     this.startTime = startTime.substring(0, 17) + '00.000';
    //   }
    //   if (this.endTime != null) {
    //     this.endTime = endTime.substring(0, 17) + '00.000';
    //   }
    // }
    if (userRole == USER_ROLE) {
      if (startTime != null) {
        this.startTime = startTime.substring(0, 10) + ' ' + startTime.substring(11, 16) + ':00';
      }
      if (endTime != null) {
        this.endTime = endTime.substring(0, 10) + ' ' + endTime.substring(11, 16) + ':00';
      }
    }

    console.log('start time inside time service get duration : ' , this.startTime);
    console.log('end time inside time service get duration : ' , this.endTime);

    var duration = moment.duration(moment(endTime).diff(moment(startTime)));
    this.dayDiff = duration.asDays();
    this.hourDiff = duration.asHours();
    this.minDiff = Math.round(duration.asMinutes());
    this.durationInHours = Math.floor(this.minDiff / 60);
    this.durationInMins = this.minDiff % 60;

    console.log('dayDiff : ' , this.dayDiff);
    console.log('hourDiff : ' , this.hourDiff);
    console.log('minDiff : ' , this.minDiff);
    console.log('durationInHours : ' , this.durationInHours);
    console.log('durationInMins : ' , this.durationInMins);

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
      , durationInHours: this.durationInHours
      , durationInMins: this.durationInMins
    }
  }

  getStartTimeDetails(startTime: string, endTime: string, userRole: string) {
    console.log('start time in getStartTimeDetails' , startTime);
    console.log('end time in getStartTimeDetails' , endTime);
    let durationObject;
    this.startTime = startTime;
    this.startTimeDetails = moment.utc(startTime).format('ddd, DD MMM');
    //console.log('start time display : ' , moment(startTime).format('hh:mm A'));
    this.startTimeDetails = this.startTimeDetails.toUpperCase();
    this.isStartTimeSelected = true;
    if (this.isStartTimeSelected && this.isEndTimeSelected) {
      durationObject = this.getDuration(startTime, endTime, userRole);
    }
    console.log('start time details : ' , this.startTimeDetails);
    return {
      startTimeDetails: this.startTimeDetails
      , duration: durationObject
    };
  }

  getEndTimeDetails(startTime: string, endTime: string, userRole: string) {
    console.log('start time in getEndTimeDetails' , startTime);
    console.log('end time in getEndTimeDetails' , endTime);
    let durationObject;
    this.endTime = endTime;
    this.endTimeDetails = moment.utc(endTime).format('ddd, DD MMM');
    this.endTimeDetails = this.endTimeDetails.toUpperCase();
    this.isEndTimeSelected = true;
    if (this.isStartTimeSelected && this.isEndTimeSelected) {
      durationObject = this.getDuration(startTime, endTime, userRole);
    }
    console.log('end time details : ' , this.endTimeDetails);
    return { endTimeDetails: this.endTimeDetails, duration: durationObject };
  }
}
