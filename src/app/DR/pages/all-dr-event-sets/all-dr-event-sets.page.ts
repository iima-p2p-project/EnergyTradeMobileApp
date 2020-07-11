import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    , private pickerCtrl: PickerController
    , private route: ActivatedRoute) { }

  userId;
  eventSets;
  allEvents;
  completedEvents;
  cancelledEvents;
  penaltyEvents;
  failedEvents;
  eventSetsWithPublishedEvents;
  eventSetsWithScheduledEvents;
  eventSetsWithCompletedEvents;
  eventSetsWithCancelledEvents;
  eventSetsWithPenaltyEvents;
  totalEarnings = 0;
  totalPenalty = 0;
  seacrhString = "";
  activeEventSets;
  type;
  redirect;
  ngOnInit() {
    this.userId = this.ingressService.loggedInUser.userId;
  }
  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
      this.redirect = params['redirect'];
      this.fetchEventSets();
    });
  }

  fetchEventSets() {

    //fetch event set details for customer
    let user = this.userId;
    this.allEvents = [];
    this.drCustomerService.getEventSetsForCustomer(user).subscribe((res: any) => {
      this.eventSets = res.response.eventSets;
      this.activeEventSets = this.eventSets.filter(eventSet => {
        let eventDate = moment(eventSet.eventSetDate, "YYYY-MM-DD");
        let today = moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD");
        return !eventDate.isBefore(today);
      });

      this.eventSets.sort(
        (eventSet1, eventSet2) => {
          return moment(eventSet1.eventSetDate, "YYYY-MM-DD").diff(moment(eventSet2.eventSetDate, "YYYY-MM-DD"));
        });


      console.log(this.eventSets);
      this.eventSetsWithPublishedEvents = this.activeEventSets.filter(eventSet => this.checkForpublishedEvent(eventSet));
      this.eventSetsWithScheduledEvents = this.activeEventSets.filter(eventSet => this.checkForScheduledEvent(eventSet));
      this.getAllEvents();

      // this.allEvents = this.allEvents.filter(event => (
      //   event.eventCustomerMappingStatus == "8"
      //   || event.eventCustomerMappingStatus == "9"
      //   || event.eventCustomerMappingStatus == "10"
      //   || event.eventCustomerMappingStatus == "11"
      //   || event.eventCustomerMappingStatus == "12"
      // ));
      console.log("ALL events skr", this.allEvents);
      // this.completedEvents = this.allEvents.filter(event => event.eventCustomerMappingStatus == "8" || event.eventCustomerMappingStatus == "15");
      // this.cancelledEvents = this.allEvents.filter(event => event.eventCustomerMappingStatus == "9");
      // this.penaltyEvents = this.allEvents.filter(event => event.eventCustomerMappingStatus == "10");
      // this.failedEvents = this.allEvents.filter(event => event.eventCustomerMappingStatus == "11" || event.eventCustomerMappingStatus == "12");
      ///this.getTotalEarnings();

      this.totalEarnings = this.drCustomerService.totalEarnings;
      this.totalPenalty = this.drCustomerService.totalPenalty;

    });
  }

  getAllEvents() {
    this.allEvents = this.eventSets[0].events;
    for (var i = 1; i < this.eventSets.length; i++) {
      this.allEvents = this.allEvents.concat(this.eventSets[i].events);
    }

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
      if ((events[i].eventCustomerMappingStatus == "3"
        || events[i].eventCustomerMappingStatus == "4"
        || events[i].eventCustomerMappingStatus == "5"
        || events[i].eventCustomerMappingStatus == "6"
        || events[i].eventCustomerMappingStatus == "13"))
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
      if (eventSet.events[i].eventCustomerMappingStatus == "3"
        || eventSet.events[i].eventCustomerMappingStatus == "5"
        || eventSet.events[i].eventCustomerMappingStatus == "13")
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
  // getTotalEarnings() {
  //   this.totalEarnings = 0;
  //   this.totalPenalty = 0;

  //   let completedEvents = this.allEvents.filter(event => {
  //     event.eventCustomerMappingStatus == "8"
  //       || event.eventCustomerMappingStatus == "15"
  //       || event.eventCustomerMappingStatus == "10"
  //   });

  //   completedEvents.forEach(event => {
  //     this.totalEarnings += +event.earnings
  //     this.totalPenalty += +event.customerFine;
  //   });
  //   this.totalEarnings = +(this.totalEarnings / 100).toFixed(2);
  //   this.totalPenalty = +(this.totalPenalty / 100).toFixed(2);

  // }

  // getEarnings(actualRelief, commitedRelief, price) {
  //   let earnings = 0;
  //   let penalty = 0;
  //   // successful
  //   if (actualRelief >= commitedRelief) {
  //     earnings = (commitedRelief / 4) * (price / 100);
  //     penalty = 0;
  //   } else {
  //     earnings = (actualRelief / 4) * (price / 100);
  //     penalty = (commitedRelief - actualRelief) * (price * 1.2 / 100);
  //   }
  //   return (earnings - penalty).toFixed(2);
  // }

  searchEvents() {
    // if (this.seacrhString != "" || this.seacrhString != null) {

    // }
    window.alert("This is an upcoming functionality");

  }

}
