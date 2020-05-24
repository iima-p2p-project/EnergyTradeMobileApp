import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DRCustomerService } from 'src/app/services/drcustomer.service';
import { IngressService } from 'src/app/services/ingress.service';

@Component({
  selector: 'app-druser-profile',
  templateUrl: './druser-profile.page.html',
  styleUrls: ['./druser-profile.page.scss'],
})
export class DRUserProfilePage implements OnInit {

  constructor(private router: Router,
    private drCustomerService: DRCustomerService,
    private ingressService: IngressService) { }

  customerProfileDetails;
  energyAssets;

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.drCustomerService.getDRCustomerProfile(this.ingressService.loggedInUser.userId).subscribe((res: any) => {
      this.customerProfileDetails = res.response;
      this.energyAssets = this.customerProfileDetails.drCustomerDevice;
    }, (err: any) => {
      window.alert("Something went wrong in fetching DR Customer profile details");
    });
  }



  goToAddAssets() {
    this.router.navigate(['add-drasset'], {
      queryParams: {
        redirect: "/druser-profile",
        type: "ADD"
      }
    });
  }

  gotToEditAsset(asset: any) {
    this.router.navigate(['add-drasset'], {
      queryParams: {
        redirect: "/druser-profile",
        type: "EDIT",
        capacity: asset.deviceCapacity,
        assetName: asset.drDeviceName,
        userDeviceId: asset.drDeviceId

      }
    });

  }

  viewProfile() {
    this.router.navigate(['contract-details'], {
      queryParams: {
        redirect: "/druser-profile",
      }
    });
  }





}
