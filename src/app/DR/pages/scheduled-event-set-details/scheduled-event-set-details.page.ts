import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { IngressService } from 'src/app/services/ingress.service';
import { DRCustomerService } from 'src/app/services/drcustomer.service';
import * as moment from 'moment';
import { DeleteModalPage } from 'src/app/modals/delete-modal/delete-modal.page';
import { EditEventModalPage } from 'src/app/modals/edit-event-modal/edit-event-modal.page';
import { WithdrawEventModalPage } from 'src/app/modals/withdraw-event-modal/withdraw-event-modal.page';
import { EditBidModalPage } from 'src/app/modals/edit-bid-modal/edit-bid-modal.page';

@Component({
  selector: 'app-scheduled-event-set-details',
  templateUrl: './scheduled-event-set-details.page.html',
  styleUrls: ['./scheduled-event-set-details.page.scss'],
})
export class ScheduledEventSetDetailsPage implements OnInit {
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
  scheduledEvents;
  selectedDevices;
  selectedDeviceIds;


  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.eventSetId = +params["eventSetId"];
      this.caller = params["caller"];
      this.maxMinPrice = params["maxMinPrice"];
      this.maxMinPower = params["maxMinPower"];
      this.eventSetName = params["evenSetName"];
      this.userId = this.ingressService.loggedInUser.userId;
      //get event set events
      this.getEvents();

    });
  }

  getEvents() {
    this.drCustomerService.getEventsForCustomerAndEventSet(this.eventSetId, this.userId).subscribe((res: any) => {
      this.allEvents = res.response.events;
      this.scheduledEvents = this.allEvents.filter(event => (event.eventCustomerDetails.eventCustomerStatus == 3
        || event.eventCustomerDetails.eventCustomerStatus == 4
        || event.eventCustomerDetails.eventCustomerStatus == 5
        || event.eventCustomerDetails.eventCustomerStatus == 6
        || event.eventCustomerDetails.eventCustomerStatus == 13) && event.eventStatus != 'Expired'
      );
      console.log("scheduledEvents", this.scheduledEvents);
      this.allCustomerDevices = res.response.allCustomerDevices;
      this.maxMinTime = this.findMaxMinTime();
    });
  }

  refreshEvents(refreshEvent) {
    this.getEvents();
    setTimeout(() => {
      refreshEvent.target.complete();
    }, 1000);
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

  async editEvent(eventId, type, mappedDevices, startTime, endTime) {
    let editEventModal = await this.modal.create({
      component: EditEventModalPage,
      cssClass: 'edit-event-modal-css',
      componentProps: {
        params: {
          allDevices: this.allCustomerDevices,
          selectedDevices: mappedDevices,
          timeRange: moment.utc(startTime).format("hh:mm A") + " - " + moment.utc(endTime).format("hh:mm A"),
          eventId,
          type,
          userId: this.userId
        }
      }
    });

    editEventModal.onWillDismiss().then((data: any) => {
      this.getEvents();
    });
    return await editEventModal.present();
  }

  async withdrawEvent(eventId, startTime, endTime) {
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
    });
    return await withdrawEventModal.present();
  }



  async deletePumps() {
    let deletePumpsModal = await this.modal.create({
      component: DeleteModalPage,
      cssClass: 'delete-modal-css',
      componentProps: {
        assetName: '123'
      }
    });
    return await deletePumpsModal.present();
  }

  showNotifications() {
    this.router.navigateByUrl('/notifications');
  }

  formatTime(eventTime) {
    return moment.utc(eventTime).format("hh:mm A");
  }

  getEventCustomerStatus(status) {
    switch (status) {
      case 1: return "Draft"
      case 2: return "Notified"
      case 3: return "PARTICIPATED"
      case 4: return "COUNTER BID"
      case 5: return "PARTICIPATED"
      case 6: return "REJECTED"
      case 7: return "Withdrawn"
      case 8: return "Completed"
      case 9: return "Cancelled"
      case 10: return "Penalty"
      case 11: return "Device Offline"
      case 12: return "Device Offline"
      case 13: return "LIVE"
      case 14: return 'Expired';
    }
  }

  isEditable(eventStatus) {
    if (eventStatus == 3 || eventStatus == 4)
      return true;
    else
      return false;
  }

  getLabelClass(status) {

    switch (status) {
      case 1: return 'status sceduled'; //"Draft"
      case 2: return 'status sceduled'; //"Notified"
      case 3: return 'status sceduled'; //"Participated"
      case 4: return 'status counter-bid'; //"Counter Bid"
      case 5: return 'status sceduled'; //"Scheduled"
      case 6: return 'status rejected'; //"Rejected"
      case 7: return 'status rejected'; //"Withdrawn"
      case 8: return 'status completed'; //"Completed"
      case 9: return 'status cancelled'; //"Cancelled"
      case 10: return 'status penalty'; //"Penalty"
      case 11: return 'status offline'; //"Device Offline"
      case 12: return 'status offline'; //"Device Offline"
      case 13: return 'status live'; //"Live"
      case 14: return 'status expired'; //"Expired
    }
  }

}
