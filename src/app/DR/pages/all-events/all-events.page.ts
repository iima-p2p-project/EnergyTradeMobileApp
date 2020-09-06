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


    this.allEvents.sort(
      (event1, event2) => {
        return moment(event2.eventStartTime).diff(moment(event1.eventStartTime));
      });

    this.completedEvents = this.allEvents.filter(event => event.eventCustomerMappingStatus == "15" && event.isFineApplicable == 'N');
    this.cancelledEvents = this.allEvents.filter(event => event.eventCustomerMappingStatus == "9");
    this.penaltyEvents = this.allEvents.filter(event => event.eventCustomerMappingStatus == "15" && event.isFineApplicable == 'Y');
    this.failedEvents = this.allEvents.filter(event => event.eventCustomerMappingStatus == "11" || event.eventCustomerMappingStatus == "12");



    this.cancelledEvents.sort(
      (event1, event2) => {
        return moment(event1.eventStartTime).diff(moment(event2.eventStartTime));
      });


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
    return moment.utc(date).format("DD MMM, YYYY");
  }

  getStartEnd(startTime, endTime) {
    return moment.utc(startTime).format("hh:mm A") + " - " + moment.utc(endTime).format("hh:mm A")
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

  searchEvents() {
    window.alert("This is an upcoming functionality");
  }

}
