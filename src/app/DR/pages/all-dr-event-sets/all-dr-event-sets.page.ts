import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngressService } from 'src/app/services/ingress.service';
import { DRCustomerService } from 'src/app/services/drcustomer.service';
import * as moment from 'moment';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-all-dr-event-sets',
  templateUrl: './all-dr-event-sets.page.html',
  styleUrls: ['./all-dr-event-sets.page.scss'],
})
export class AllDrEventSetsPage implements OnInit {

  constructor(private router: Router
    , private ingressService: IngressService
    , private drCustomerService: DRCustomerService
    , private pickerCtrl: PickerController) { }

  userId;
  eventSets;
  allEvents;
  completedEvents;
  cancelledEvents;
  penaltyEvents;
  eventSetsWithPublishedEvents;
  eventSetsWithScheduledEvents;
  eventSetsWithCompletedEvents;
  eventSetsWithCancelledEvents;
  eventSetsWithPenaltyEvents;
  totalEarnings = 0;
  totalPenalty = 0;
  seacrhString = "";
  ngOnInit() {
    this.userId = this.ingressService.loggedInUser.userId;

  }
  ionViewDidEnter() {
    //fetch event set details for customer
    let user = this.userId;
    this.allEvents = [];
    this.drCustomerService.getEventSetsForCustomer(user).subscribe((res: any) => {
      this.eventSets = res.response.eventSets;
      console.log(this.eventSets);
      this.eventSetsWithPublishedEvents = this.eventSets.filter(eventSet => this.checkForpublishedEvent(eventSet));
      this.eventSetsWithScheduledEvents = this.eventSets.filter(eventSet => this.checkForScheduledEvent(eventSet));
      // this.eventSetsWithCompletedEvents = this.eventSets.filter(eventSet => this.checkForCompletedEvent(eventSet));
      // this.eventSetsWithCancelledEvents = this.eventSets.filter(eventSet => this.checkForCancelledEvent(eventSet));
      // this.eventSetsWithPenaltyEvents = this.eventSets.filter(eventSet => this.checkForPenaltyEvent(eventSet));
      // this.eventSets.forEach(eventSet => {
      //   let events = eventSet.events;
      //   this.allEvents.concat(eventSet.events);
      // });
      this.allEvents = this.eventSets[0].events;
      for (var i = 1; i < this.eventSets.length; i++) {
        this.allEvents = this.allEvents.concat(this.eventSets[i].events);
      }
      this.allEvents = this.allEvents.filter(event => (
        event.eventCustomerMappingStatus == "8"
        || event.eventCustomerMappingStatus == "9"
        || event.eventCustomerMappingStatus == "10"
      ));
      console.log("ALL events skr", this.allEvents);
      this.completedEvents = this.allEvents.filter(event => event.eventCustomerMappingStatus == "8");
      this.cancelledEvents = this.allEvents.filter(event => event.eventCustomerMappingStatus == "9");
      this.penaltyEvents = this.allEvents.filter(event => event.eventCustomerMappingStatus == "10");
      this.getTotalEarnings();
      console.log("completed", this.completedEvents);
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
      if (eventSet.events[i].eventCustomerMappingStatus == "3")
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
          maxMinPrice: this.findMaxAndMinPrice(eventSet),
          eventSetDate: eventSet.eventSetDate
        }
      });

    } else if (type == "published") {
      this.router.navigate(['/event-set-details'], {
        queryParams: {
          eventSetId: eventSet.eventSetId,
          caller: "/customer-dashboard",
          evenSetName: eventSet.eventSetName,
          maxMinPower: this.findMaxAndMinPower(eventSet),
          maxMinPrice: this.findMaxAndMinPrice(eventSet),
          eventSetDate: eventSet.eventSetDate
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
    let max = eventSet.events[0].plannedPower;
    let min = eventSet.events[0].plannedPower;
    for (let i = 1; i < eventSet.events.length; i++) {
      if (eventSet.events[i].plannedPower > max)
        max = eventSet.events[i].plannedPower;
      if (eventSet.events[i].plannedPower < min)
        min = eventSet.events[i].plannedPower;
    }

    return min + " KW - " + max + " KW"

  }

  findMaxAndMinPrice(eventSet): string {
    let max = eventSet.events[0].plannedPrice;
    let min = eventSet.events[0].plannedPrice;
    for (let i = 1; i < eventSet.events.length; i++) {
      if (eventSet.events[i].plannedPrice > max)
        max = eventSet.events[i].plannedPrice;
      if (eventSet.events[i].plannedPrice < min)
        min = eventSet.events[i].plannedPrice;
    }

    return min + " - " + max + " Paise/KWH"

  }

  async applyPeriodFilter() {
    // console.log("Apply Period Filter");

    // let opts: PickerOptions = {
    //   buttons: [{
    //     text: 'Ok', role: 'done', handler: async () => {
    //       let col = await picker.getColumn('periodOptions');
    //       console.log("Selected Col", col);
    //       let periodFilterKey = col.options[col.selectedIndex].value;
    //       console.log("Filter Key:", periodFilterKey);
    //       if (periodFilterKey == 'All')
    //         console.log("All clicked");

    //     }
    //   }, {
    //     text: "Cancel", role: "cancel", handler: () => {

    //     }
    //   }],
    //   columns: [{
    //     name: "periodOptions",
    //     options: [{ text: "All", value: "All" }
    //       , { text: "Canceled", value: "Canceled" }
    //       , { text: "Completed", value: "Completed" }
    //       , { text: "Scheduled", value: "Scheduled" }
    //       , { text: "Penalty", value: "Penalty" }]
    //   }]
    // }
    // let picker = await this.pickerCtrl.create(opts)
    // picker.present();
    window.alert("This is an upcoming functionality. Stay Tuned.")
  }


  applyEnergyFilter() {
    window.alert("This is an upcoming functionality. Stay Tuned.");
  }

  getStartEnd(startTime, endTime) {
    return moment.utc(startTime).format("hh:mm A") + " - " + moment.utc(endTime).format("hh:mm A")
  }
  getTotalEarnings() {
    this.totalEarnings = 0;
    this.totalPenalty = 0;

    this.allEvents.forEach(event => {
      this.totalEarnings += (+event.bidprice / 100) * +event.actualPower / 4;
      this.totalPenalty += +event.customerFine;
    });

  }

  getEarnings(actualRelief, commitedRelief, price) {
    let earnings = 0;
    let penalty = 0;
    // successful
    if (actualRelief >= commitedRelief) {
      earnings = (commitedRelief / 4) * (price / 100);
      penalty = 0;
    } else {
      earnings = (actualRelief / 4) * (price / 100);
      penalty = (commitedRelief - actualRelief) * (price * 1.2 / 100);
    }
    return earnings - penalty;
  }

  searchEvents() {
    // if (this.seacrhString != "" || this.seacrhString != null) {

    // }
    window.alert("This is an upcoming functionality");

  }

}
