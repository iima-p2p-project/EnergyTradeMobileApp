import { Component, OnInit } from '@angular/core';
import { DRCustomerService } from 'src/app/services/drcustomer.service';
import { IngressService } from 'src/app/services/ingress.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteModalPage } from 'src/app/modals/delete-modal/delete-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-drasset',
  templateUrl: './add-drasset.page.html',
  styleUrls: ['./add-drasset.page.scss'],
})
export class AddDRAssetPage implements OnInit {

  constructor(private drCustomerService: DRCustomerService,
    private ingressService: IngressService,
    private router: Router,
    private route: ActivatedRoute,
    public modal: ModalController
  ) { }
  assetName;
  assetPower;
  redirect;
  type;
  userDeviceId;




  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
      this.redirect = params['redirect'];
      if (this.type == "EDIT") {
        this.assetName = params['assetName'];
        this.assetPower = params['capacity'];
        this.userDeviceId = params['userDeviceId'];
      }
    });
  }

  addDRAsset() {
    this.drCustomerService.addDRDevice(this.ingressService.loggedInUser.userId
      , this.assetName
      , this.assetPower).subscribe((res: any) => {
        if (res.response.key == "200") {
          if (res.response.message == "No switches available. Cannot add device") {
            window.alert("No Available switches. Cannot add device.");
          } else {
            console.log("Success");
            this.router.navigate(['druser-profile']);
          }
        } else {
          window.alert("Something went wrong in the server");
        }
      }, (err) => {
        window.alert("Something went wrong in adding dr device");
      });

  }

  close() {
    this.router.navigate(['/druser-profile']);
  }

  editDRAsset() {
    this.drCustomerService.editDRDevice(this.userDeviceId
      , this.assetName
      , this.assetPower).subscribe((res: any) => {
        if (res.response.key == "200") {
          console.log("Success");
          this.router.navigate(['druser-profile']);
        } else {
          window.alert("Something went wrong in editing device details");
        }
      }, (err) => {
        window.alert("Something went wrong in server");
      });

  }

  async deleteDRDevice() {
    let deleteDeviceModal = await this.modal.create({
      component: DeleteModalPage,
      cssClass: 'delete-modal-css',
      componentProps: {
        assetName: this.assetName,
        userDeviceId: this.userDeviceId
      }
    });
    deleteDeviceModal.onWillDismiss().then((data: any) => {
      if (data.data == 'success') {
        this.router.navigate(['druser-profile']);
      }
    });
    return await deleteDeviceModal.present();
  }

}
