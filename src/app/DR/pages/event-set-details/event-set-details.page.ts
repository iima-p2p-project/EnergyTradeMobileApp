import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WithdrawEventModalPage } from 'src/app/modals/withdraw-event-modal/withdraw-event-modal.page';
import { EditBidModalPage } from 'src/app/modals/edit-bid-modal/edit-bid-modal.page';
import { DeleteModalPage } from 'src/app/modals/delete-modal/delete-modal.page';
import { EditEventModalPage } from 'src/app/modals/edit-event-modal/edit-event-modal.page';
import { Router, ActivatedRoute } from '@angular/router';
import { IngressService } from 'src/app/services/ingress.service';
import { DRCustomerService } from 'src/app/services/drcustomer.service';
import * as moment from 'moment';

@Component({
  selector: 'app-event-set-details',
  templateUrl: './event-set-details.page.html',
  styleUrls: ['./event-set-details.page.scss'],
})
export class EventSetDetailsPage implements OnInit {
  constructor(public modal: ModalController
    , private router: Router
    , private route: ActivatedRoute
    , private ingressService: IngressService
    , private drCustomerService: DRCustomerService) { }

  eventSetId;
  caller;
  userId;
  allCustomerDevices;
  allEvents;
  maxMinPower;
  maxMinPrice;
  maxMinTime;
  eventSetName;
  publishedEvents;


  selectedDevices = {};
  selectedDeviceIds;
  deviceChipCss = "border event-chip active";

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.eventSetId = +params["eventSetId"];
      this.caller = params["caller"];
      this.maxMinPrice = params["maxMinPrice"];
      this.maxMinPower = params["maxMinPower"];
      this.eventSetName = params["evenSetName"];
      //this.userId= this.ingressService.loggedInUserId;
      this.userId = 48;
      //get event set events
      this.getEvents();

    });
  }

  getEvents() {
    this.drCustomerService.getEventsForCustomerAndEventSet(this.eventSetId, this.userId).subscribe((res: any) => {
      this.allEvents = res.response.events;
      this.publishedEvents = this.allEvents.filter(event => event.eventCustomerDetails.eventCustomerStatus == 2)
      this.allCustomerDevices = res.response.allCustomerDevices;
      this.preSelectDevices(this.publishedEvents, this.allCustomerDevices);
      this.maxMinTime = this.findMaxMinTime();
    });


  }

  refreshEvents(refreshEvent) {
    this.drCustomerService.getEventsForCustomerAndEventSet(this.eventSetId, this.userId).subscribe((res: any) => {
      this.allEvents = res.response.events;
      this.publishedEvents = this.allEvents.filter(event => event.eventCustomerDetails.eventCustomerStatus == 2)
      this.allCustomerDevices = res.response.allCustomerDevices;
      this.preSelectDevices(this.publishedEvents, this.allCustomerDevices);
      this.maxMinTime = this.findMaxMinTime();
    });

    setTimeout(() => {
      refreshEvent.target.complete();
    }, 1000);
  }
  preSelectDevices(events, devices) {
    let i, j = 0;
    for (i = 0; i < events.length; i++) {
      let commitedPower = 0
      let eventId = events[i].eventId;

      this.selectedDevices[eventId] = { "devices": devices };
      this.selectedDevices[eventId].status = "published";
      this.selectedDevices[eventId].counterBidAmount = 0;

      for (j = 0; j < devices.length; j++) {
        commitedPower += devices[j].deviceCapacity;
      }
      this.selectedDevices[eventId].commitedPower = commitedPower;
    }

    //console.log("Selected Devices", this.selectedDevices);
  }
  toggleDeviceSelection(eventId, device) {
    let presentDeviceArray = this.selectedDevices[eventId].devices.slice();
    let i = 0;
    let flag = false;
    for (i = 0; i < presentDeviceArray.length; i++) {
      if (presentDeviceArray[i].drDeviceId == device.drDeviceId) {
        this.selectedDevices[eventId].commitedPower = this.selectedDevices[eventId].commitedPower - device.deviceCapacity;

        presentDeviceArray.splice(i, 1);
        flag = true;
        break;
      }
    }
    if (!flag) {
      this.selectedDevices[eventId].commitedPower = this.selectedDevices[eventId].commitedPower + device.deviceCapacity;

      presentDeviceArray.push(device);
    }
    this.selectedDevices[eventId].devices = presentDeviceArray;
    console.log("Updated device selecttion", this.selectedDevices);
  }

  chipCssCheck(eventId, device) {

    let deviceArray = this.selectedDevices[eventId].devices;
    let i = 0;
    for (let i = 0; i < deviceArray.length; i++) {
      if (deviceArray[i].drDeviceId == device.drDeviceId) {
        return true;
      }
    }
    return false;
  }




  findMaxMinTime() {
    let maxTime = moment.utc(this.allEvents[0].eventEndTime);
    let minTime = moment.utc(this.allEvents[0].eventStartTime);
    for (let i = 0; i < this.allEvents.length; i++) {
      if (moment.utc(this.allEvents[i].eventStartTime).isBefore(minTime))
        minTime = moment.utc(this.allEvents[i].eventStartTime);
      if (moment.utc(this.allEvents[i].eventEndTime).isAfter(maxTime))
        maxTime = moment.utc(this.allEvents[i].eventEndTime);
    }

    return minTime.format("hh:mm A") + " - " + maxTime.format("hh:mm A");
  }
  formatTime(eventTime) {
    return moment.utc(eventTime).format("hh:mm a");
  }


  participateInEvent(eventId, committedPower, selectedDevices) {
    let deviceArray = [];
    for (let i = 0; i < selectedDevices.length; i++) {
      deviceArray.push(selectedDevices[i].drDeviceId);
    }
    this.drCustomerService.participateInEvent(eventId, this.userId, committedPower, deviceArray).subscribe((res: any) => {
      if (res.response.message != "Success") {
        console.log("Something went wrong in participating in event");
      } else {
        this.selectedDevices[eventId].status = "participated";
        //this.getEvents();
      }
    });
  }

  // counterBidInEvent(eventId, committedPower, selectedDevices) {
  //   let deviceArray = [];
  //   for (let i = 0; i < selectedDevices.length; i++) {
  //     deviceArray.push(selectedDevices[i].drDeviceId);
  //   }
  //   this.drCustomerService.participateInEvent(eventId, this.userId, committedPower, deviceArray).subscribe((res: any) => {
  //     if (res.response.message != "Success") {
  //       console.log("Something went wrong in participating in event");
  //     } else {
  //       this.selectedDevices[eventId].status = "counterbid";
  //       //this.getEvents();
  //     }
  //   });
  // }


  async counterBid(eventId, startTime, endTime, expectedPrice) {
    let editEventModal = await this.modal.create({
      component: EditBidModalPage,
      cssClass: 'edit-bid-modal-css',
      componentProps: {
        params: {
          eventId: eventId,
          userId: this.userId,
          devices: this.selectedDevices[eventId].devices,
          commitedPower: this.selectedDevices[eventId].commitedPower,
          timeRange: moment(startTime).format("hh:mm A") + " - " + moment(endTime).format("hh:mm A"),
          expectedPrice: expectedPrice,
          type: 'counterbid'
        }
      }
    });
    editEventModal.onWillDismiss().then((data: any) => {
      if (data.data.type == 'bid') {
        this.selectedDevices[eventId].status = "counterbid";
        this.selectedDevices[eventId].counterBidAmount = data.data.bid;
      }
    });
    return await editEventModal.present();
  }


  async editEvent(eventId, type, startTime, endTime) {


    let editEventModal = await this.modal.create({
      component: EditEventModalPage,
      cssClass: 'edit-event-modal-css',
      componentProps: {
        params: {
          eventId: eventId,
          userId: this.userId,
          type: type,
          // counterBidAmount: this.selectedDevices[eventId].counterBidAmount,
          allDevices: this.allCustomerDevices,
          committedPower: this.selectedDevices[eventId].commitedPower,
          selectedDevices: this.selectedDevices[eventId].devices,
          timeRange: moment(startTime).format("hh:mm A") + " - " + moment(endTime).format("hh:mm A"),

        }
      }
    });

    editEventModal.onDidDismiss().then((data: any) => {
      this.selectedDevices[eventId].commitedPower = data.data.committedPower;
      this.selectedDevices[eventId].devices = data.data.selectedDevices;
    })
    return await editEventModal.present();

  }

  async withdrawFromEvent(eventId, startTime, endTime) {
    let withdrawEventModal = await this.modal.create({
      component: WithdrawEventModalPage,
      cssClass: 'withdraw-event-modal-css',
      componentProps: {
        params: {
          eventId,
          userId: this.userId,
          timeRange: moment.utc(startTime).format("hh:mm A") + " - " + moment.utc(endTime).format("hh:mm A")
        }
      }
    });

    withdrawEventModal.onDidDismiss().then((data: any) => {
      this.getEvents();
    })
    return await withdrawEventModal.present();
  }


}

