import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngressService } from 'src/app/services/ingress.service';
import { DRCustomerService } from 'src/app/services/drcustomer.service';
import * as moment from 'moment';

@Component({
  selector: 'app-all-dr-event-sets',
  templateUrl: './all-dr-event-sets.page.html',
  styleUrls: ['./all-dr-event-sets.page.scss'],
})
export class AllDrEventSetsPage implements OnInit {

  constructor(private router: Router
    , private ingressService: IngressService
    , private drCustomerService: DRCustomerService) { }

  userId;
  eventSets;
  eventSetsWithPublishedEvents;
  eventSetsWithScheduledEvents;
  eventSetsWithCompletedEvents;
  eventSetsWithCancelledEvents;
  eventSetsWithPenaltyEvents;
  ngOnInit() {
    this.userId = this.ingressService.loggedInUser.userId;

  }
  ionViewDidEnter() {
    //fetch event set details for customer
    let user = this.userId;
    this.drCustomerService.getEventSetsForCustomer(user).subscribe((res: any) => {
      this.eventSets = res.response.eventSets;
      console.log(this.eventSets);
      this.eventSetsWithPublishedEvents = this.eventSets.filter(eventSet => this.checkForpublishedEvent(eventSet));
      this.eventSetsWithScheduledEvents = this.eventSets.filter(eventSet => this.checkForScheduledEvent(eventSet));
      this.eventSetsWithCompletedEvents = this.eventSets.filter(eventSet => this.checkForCompletedEvent(eventSet));
      this.eventSetsWithCancelledEvents = this.eventSets.filter(eventSet => this.checkForCancelledEvent(eventSet));
      this.eventSetsWithPenaltyEvents = this.eventSets.filter(eventSet => this.checkForPenaltyEvent(eventSet));
    });
  }
  checkForCompletedEvent(eventSet) {
    let events = eventSet.events;
    for (let i = 0; i < events.length; i++) {
      if (events[i].eventCustomerMappingStatus == "8")
        return true;
    }
    return false;

  }

  checkForCancelledEvent(eventSet) {
    let events = eventSet.events;
    for (let i = 0; i < events.length; i++) {
      if (events[i].eventCustomerMappingStatus == "9")
        return true;
    }
    return false;

  }

  checkForPenaltyEvent(eventSet) {
    let events = eventSet.events;
    for (let i = 0; i < events.length; i++) {
      if (events[i].eventCustomerMappingStatus == "10")
        return true;
    }
    return false;

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
  showEventSetDetails(eventSet, type) {
    if (type == "scheduled") {
      this.router.navigate(['/scheduled-event-set-details'], {
        queryParams: {
          eventSetId: eventSet.eventSetId,
          caller: "/customer-dashboard",
          evenSetName: eventSet.eventSetName,
          maxMinPower: this.findMaxAndMinPower(eventSet),
          maxMinPrice: this.findMaxAndMinPrice(eventSet)
        }
      });

    } else if (type == "published") {
      this.router.navigate(['/event-set-details'], {
        queryParams: {
          eventSetId: eventSet.eventSetId,
          caller: "/customer-dashboard",
          evenSetName: eventSet.eventSetName,
          maxMinPower: this.findMaxAndMinPower(eventSet),
          maxMinPrice: this.findMaxAndMinPrice(eventSet)
        }
      });
    }
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
