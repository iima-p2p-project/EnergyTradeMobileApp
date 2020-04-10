import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngressService } from 'src/app/services/ingress.service';
import { DRCustomerService } from 'src/app/services/drcustomer.service';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.page.html',
  styleUrls: ['./customer-dashboard.page.scss'],
})
export class CustomerDashboardPage implements OnInit {

  constructor(private router: Router
    , private ingressService: IngressService
    , private drCustomerService: DRCustomerService) { }

  userId;
  eventSets;
  eventSetsWithPublishedEvents;
  eventSetsWithScheduledEvents;
  ngOnInit() {
    this.userId = this.ingressService.loggedInUserId;

  }
  ionViewDidEnter() {
    //fetch event set details for customer

    this.drCustomerService.getEventSetsForCustomer(48).subscribe((res: any) => {
      this.eventSets = res.response.eventSets;
      console.log(this.eventSets);
      this.eventSetsWithPublishedEvents = this.eventSets.filter(eventSet => this.checkForpublishedEvent(eventSet))
      this.eventSetsWithScheduledEvents = this.eventSets.filter(eventSet => this.checkForScheduledEvent(eventSet))
    });
  }

  checkForScheduledEvent(eventSet): boolean {
    let events = eventSet.events;
    for (let i = 0; i < events.length; i++) {
      if (events[i].eventCustomerMappingStatus == "3" || events[i].eventCustomerMappingStatus == "4")
        return true;
    }
    return false;
  }

  countCounterBids(eventSet) {
    let countCounterBids = 0;
    for (let i = 0; i < eventSet.events.length; i++)
      if (eventSet.events[i].eventCustomerMappingStatus == "4")
        countCounterBids++;
    return countCounterBids;
  }

  countScheduled(eventSet) {
    let scheduled = 0;
    for (let i = 0; i < eventSet.events.length; i++)
      if (eventSet.events[i].eventCustomerMappingStatus == "2")
        scheduled++;
    return scheduled;
  }
  checkForpublishedEvent(eventSet): boolean {
    let events = eventSet.events;
    for (let i = 0; i < events.length; i++) {
      if (events[i].eventCustomerMappingStatus == "2")
        return true;
    }
    return false;
  }
  viewAllEventSets() {
    this.router.navigateByUrl('/all-dr-event-sets');
  }
  showEventSetDetails(eventId) {
    this.router.navigateByUrl('/event-set-details');
  }
  showNotifications() {
    this.router.navigateByUrl('/notifications');
  }

  formatTime(date) {
    return moment(date).format("DD MMM, YYYY");
  }


  findMaxAndMinPower(eventSet): string {
    let max = 0;
    let min = 0;
    for (let i = 0; i < eventSet.events.length; i++) {
      if (eventSet.events[i].plannedPower > max)
        max = eventSet.events[i].plannedPower;
      if (eventSet.events[i].plannedPower < min)
        min = eventSet.events[i].plannedPower;
    }

    return min + " KW - " + max + " KW"

  }

  findMaxAndMinPrice(eventSet): string {
    let max = 0;
    let min = 0;
    for (let i = 0; i < eventSet.events.length; i++) {
      if (eventSet.events[i].plannedPrice > max)
        max = eventSet.events[i].plannedPrice;
      if (eventSet.events[i].plannedPrice < min)
        min = eventSet.events[i].plannedPrice;
    }

    return min + " - " + max + " Paise/KWH"

  }

}
