import { Injectable } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
// import { start } from 'repl';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  startYear: string;
  startMonth: string;
  startDay: string;
  startHour: string;
  startMin: string;
  startSec: string;

  endYear: string;
  endMonth: string;
  endDay: string;
  endHour: string;
  endMin: string;
  endSec: string;

  dayDiff: number;
  hourDiff: number;
  minDiff: number;

  hourCarryOver: number;
  dayCarryOver: number;

  duration: any;

  durationInHours: any;
  durationInMins: any;

  constructor() { }

  getDuration(startTime: string, endTime: string) {
    var duration = moment.duration(moment(endTime).diff(moment(startTime)));
    this.dayDiff = duration.asDays();
    this.hourDiff = duration.asHours();
    this.minDiff = duration.asMinutes();

    if(this.minDiff>0) {
      this.minDiff = this.minDiff + 1;
      if(this.minDiff==60) {
        this.minDiff = 0;
        this.hourCarryOver = 1;
      }
    }

    if(this.hourDiff>0) {
      this.hourDiff = this.hourDiff + 1;
      if(this.hourDiff==24) {
        this.hourDiff = 0;
        this.dayCarryOver = 1;
      }
    }
    this.hourDiff = this.hourDiff + this.hourCarryOver;

    this.dayDiff = this.dayDiff + this.dayCarryOver;

    if(this.dayDiff>0) {
      this.hourDiff = this.hourDiff + this.dayDiff * 24;
    }

    if(this.hourDiff<10) {
      this.durationInHours = '0' + this.hourDiff;
    }
    else {
      this.durationInHours = + this.hourDiff;
    }

    if(this.minDiff<10) {
      this.durationInMins = '0' + this.minDiff;
    }
    else {
      this.durationInMins = + this.minDiff;
    }
    console.log('duration : ' , this.durationInHours); 
    console.log('hours : ' , this.durationInMins); 
    //console.log('minutes : ' , duration.asMinutes()); 
    this.duration = { durationInHour: this.durationInHours , durationInMin: this.durationInMins };

    return this.duration;
  }
}
