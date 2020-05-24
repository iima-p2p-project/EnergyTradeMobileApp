import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DRCustomerService } from 'src/app/services/drcustomer.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.page.html',
  styleUrls: ['./delete-modal.page.scss'],
})
export class DeleteModalPage implements OnInit {

  assetName = '';
  userDeviceId;
  constructor(public modal: ModalController
    , public navParams: NavParams
    , private drCustomerService: DRCustomerService) { }

  ngOnInit() {
    this.assetName = this.navParams.get('assetName');
    this.userDeviceId = this.navParams.get('userDeviceId');
  }

  close() {
    this.modal.dismiss();
  }

  delete() {
    this.drCustomerService.deleteDRDevice(this.userDeviceId).subscribe((res: any) => {
      if (res.response.key == "200") {
        console.log("Success");
        this.modal.dismiss("success");
      } else {
        window.alert("Something went wrong in deleting dr device");
      }
    }, (err) => {
      window.alert("Something went wrong in server");
    });
  }
}
