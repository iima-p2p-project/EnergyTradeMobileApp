import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DRCustomerService } from 'src/app/services/drcustomer.service';
import { EditEventModalPage } from '../edit-event-modal/edit-event-modal.page';

@Component({
  selector: 'app-edit-bid-modal',
  templateUrl: './edit-bid-modal.page.html',
  styleUrls: ['./edit-bid-modal.page.scss'],
})
export class EditBidModalPage implements OnInit {

  constructor(public modal: ModalController,
    private drCustomerService: DRCustomerService) { }
  @Input() params: any;
  headerText = "";
  yourBid;
  expectedPrice;
  timeRange = "";
  actionButtonText = "Counter Bid";
  type;

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.type = this.params.type;

    if (this.params.type == 'counterbid') {
      this.headerText = "Counter Bid for Event";
      this.actionButtonText = "Counter Bid";
    } else {
      this.headerText = "Edit Counter Bid for Event";
      this.actionButtonText = "Update";

    }
    this.timeRange = this.params.timeRange;
    this.expectedPrice = this.params.expectedPrice;

  }

  close(type) {
    this.modal.dismiss({ type });
  }

  async counterBidInEvent() {

    if (this.type == "counterbid") {

      let deviceArray = [];
      for (let i = 0; i < this.params.devices.length; i++) {
        deviceArray.push(this.params.devices[i].drDeviceId);
      }

      if (deviceArray.length == 0) {
        window.alert("Please select any device to counterbid");
      } else {


        this.drCustomerService.counterBidToEvent(this.params.eventId
          , this.params.userId
          , this.params.commitedPower
          , this.yourBid
          , deviceArray).subscribe((res: any) => {
            if (res.response.message == "Power Committed is already more than Planned Power") {
              window.alert("Cant commit " + this.params.commitedPower + " KW power as it would overshoot the total asked commitment");
            } else if (res.response.message != "Success") {
              console.log("Something went wrong in counter bid");
            } else {
              this.modal.dismiss({
                bid: this.yourBid,
                type: 'bid'
              });
            }
          })
      }

    }
    else {

      let editEventModal = await this.modal.create({
        component: EditEventModalPage,
        cssClass: 'edit-event-modal-css',
        componentProps: {
          params: this.params

        }
      });
      this.modal.dismiss({
        bid: this.yourBid
      });

      return await editEventModal.present();
    }
  }
}
