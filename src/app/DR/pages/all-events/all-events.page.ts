import { Component, OnInit } from '@angular/core';
import { IngressService } from 'src/app/services/ingress.service';
import { DRCustomerService } from 'src/app/services/drcustomer.service';

import * as moment from 'moment';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.page.html',
  styleUrls: ['./all-events.page.scss'],
})
export class AllEventsPage implements OnInit {

  constructor(private ingressService: IngressService
    , private drCustomerService: DRCustomerService) { }
  completedEvents;
  cancelledEvents;
  penaltyEvents;
  failedEvents;
  allEvents;
  userId;
  eventSets;
  activeEventSets;
  totalEarnings = 0;
  totalPenalty = 0;

  ngOnInit() {
    this.userId = this.ingressService.loggedInUser.userId;
  }

  ionViewDidEnter() {
    this.getEventSets();
  }

  getEventSets() {
    let user = this.userId;
    this.allEvents = [];
    this.drCustomerService.getEventSetsForCustomer(user).subscribe((res: any) => {
      this.eventSets = res.response.eventSets;
      console.log(this.eventSets);
      this.getAllEvents();
      //this.getTotalEarnings();
      this.totalEarnings = this.drCustomerService.totalEarnings;
      this.totalPenalty = this.drCustomerService.totalPenalty;
    });

  }


  getAllEvents() {
    this.allEvents = this.eventSets[0].events;
    for (var i = 1; i < this.eventSets.length; i++) {
      this.allEvents = this.allEvents.concat(this.eventSets[i].events);
    }
    // this.allEvents = this.allEvents.filter(event => (
    //   event.eventCustomerMappingStatus == "8"
    //   || event.eventCustomerMappingStatus == "9"
    //   || event.eventCustomerMappingStatus == "10"
    //   || event.eventCustomerMappingStatus == "11"
    //   || event.eventCustomerMappingStatus == "12"
    // ));
    console.log("All events:", this.allEvents);

    this.completedEvents = this.allEvents.filter(event => event.eventCustomerMappingStatus == "15" && event.isFineApplicable == 'N');
    this.cancelledEvents = this.allEvents.filter(event => event.eventCustomerMappingStatus == "9");
    this.penaltyEvents = this.allEvents.filter(event => event.eventCustomerMappingStatus == "15" && event.isFineApplicable == 'Y');
    this.failedEvents = this.allEvents.filter(event => event.eventCustomerMappingStatus == "11" || event.eventCustomerMappingStatus == "12");

  }

  // getTotalEarnings() {
  //   this.totalEarnings = 0;
  //   this.totalPenalty = 0;

  //   this.allEvents.forEach(event => {
  //     this.totalEarnings += +event.earnings
  //     this.totalPenalty += +event.customerFine;
  //   });
  //   this.totalEarnings = +(this.totalEarnings / 100).toFixed(2);
  //   this.totalPenalty = +(this.totalPenalty / 100).toFixed(2);

  // }


  formatTime(date) {
    return moment(date).format("DD MMM, YYYY");
  }

  getStartEnd(startTime, endTime) {
    return moment.utc(startTime).format("hh:mm A") + " - " + moment.utc(endTime).format("hh:mm A")
  }

}
