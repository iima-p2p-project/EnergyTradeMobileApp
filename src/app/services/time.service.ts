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

  getDuration(startTime: string, endTime: string) {
    this.startTime = startTime.substring(0,17)+'00.000';
    this.endTime = endTime.substring(0,17)+'00.000';
    var duration = moment.duration(moment(endTime).diff(moment(startTime)));
    this.dayDiff = duration.asDays();
    this.hourDiff = duration.asHours();
    this.minDiff = Math.round(duration.asMinutes());
    console.log('min diff : ' , this.minDiff);
    this.durationInHours = Math.floor(this.minDiff/60);
    this.durationInMins = this.minDiff%60;
    if(parseInt(this.durationInHours)<10) {
      this.durationInHours = '0' + this.durationInHours;
    }
    if(parseInt(this.durationInMins)<10) {
      this.durationInMins = '0' + this.durationInMins;
    }
    this.duration = this.durationInHours+":"+this.durationInMins;
    return this.duration;
  }
  

  getStartTimeDetails(startTime: string, endTime: string) {
    this.startTime = startTime;
    this.startTimeDetails = moment(startTime).format('ddd, DD MMM');
    //console.log('start time display : ' , moment(startTime).format('hh:mm A'));
    this.startTimeDetails = this.startTimeDetails.toUpperCase();
    this.isStartTimeSelected = true;
    if(this.isStartTimeSelected && this.isEndTimeSelected) {
      this.duration = this.getDuration(startTime,endTime);
    }
    return {startTimeDetails: this.startTimeDetails, duration: this.duration};
  }

  getEndTimeDetails(startTime: string, endTime: string) {
    this.endTime = endTime;
    this.endTimeDetails = moment(endTime).format('ddd, DD MMM');
    this.endTimeDetails = this.endTimeDetails.toUpperCase();
    this.isEndTimeSelected = true;
    if(this.isStartTimeSelected && this.isEndTimeSelected) {
      this.duration = this.getDuration(startTime,endTime);
    }
    return {endTimeDetails: this.endTimeDetails, duration: this.duration};
  }
}
