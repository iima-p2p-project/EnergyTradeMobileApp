import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DRCustomerService } from 'src/app/services/drcustomer.service';

@Component({
  selector: 'app-edit-event-modal',
  templateUrl: './edit-event-modal.page.html',
  styleUrls: ['./edit-event-modal.page.scss'],
})
export class EditEventModalPage implements OnInit {

  constructor(public modal: ModalController
    , private drCustomerService: DRCustomerService) { }

  @Input() params;
  selectedDevices = [];
  committedPower = 0;
  acSelected;


  ngOnInit() {
  }

  updateEventCommitment() {
    let deviceList = [];
    if (this.committedPower == 0) {
      window.alert("Please select any device");
    } else {
      for (let i = 0; i < this.selectedDevices.length; i++)
        deviceList.push(this.selectedDevices[i].drDeviceId);

      this.drCustomerService.updateEventCommitments(this.params.eventId
        , this.params.userId
        , this.committedPower
        , 0
        , deviceList).subscribe((res: any) => {
          if (res.response.message != "Success")
            console.log("Something went wrong in edit event");
          else
            this.modal.dismiss({
              selectedDevices: this.selectedDevices,
              committedPower: this.committedPower
            });

        });
    }

  }
  ionViewWillEnter() {
    this.acSelected = false;
    console.log(this.params);
    this.selectedDevices = this.params.selectedDevices.filter(() => true);
    for (let i = 0; i < this.selectedDevices.length; i++) {
      this.committedPower += this.selectedDevices[i].deviceCapacity;
      if (this.selectedDevices[i].deviceTypeId == 1)
        this.acSelected = true;
    }
    console.log("Commited power", this.committedPower);

  }

  toggleDeviceSelection(device) {
    let i = 0;
    let flag = false;


    for (i = 0; i < this.selectedDevices.length; i++) {
      if (this.selectedDevices[i].drDeviceId == device.drDeviceId) {
        if (device.deviceTypeId == 1)
          this.acSelected = false;
        this.committedPower = this.committedPower - device.deviceCapacity;

        this.selectedDevices.splice(i, 1);
        flag = true;
        break;
      }
    }
    if (!flag) {
      if (device.deviceTypeId == 1) {
        if (this.acSelected == false) {
          this.acSelected = true;
          // checking for event type and device ID rules
          if (this.params.eventType == "Load Shift" && device.deviceTypeName != "Load Shift") {
            window.alert("Please select load shift devices only for load shift events");
          } else {
            this.committedPower = this.committedPower + device.deviceCapacity;
            this.selectedDevices.push(device);
          }
        } else {
          window.alert("Cannot have both AC and AC Setpoint change selected.")
        }
      }
      else {

        //check for load shift events
        if (this.params.eventType == "Load Shift" && device.deviceTypeName != "Load Shift") {
          window.alert("Please select load shift devices only for load shift events");
        } else {
          this.committedPower = this.committedPower + device.deviceCapacity;
          this.selectedDevices.push(device);

        }
      }


    }
    console.log("Updated device selecttion", this.selectedDevices);
  }


  checkDeviceSelection(deviceId) {
    let i = 0;
    for (i = 0; i < this.selectedDevices.length; i++) {
      if (this.selectedDevices[i].drDeviceId == deviceId)
        return true;
    }
    return false;
  }

  close() {
    this.modal.dismiss();
  }
}
