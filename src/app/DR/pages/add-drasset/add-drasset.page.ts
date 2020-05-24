import { Component, OnInit } from '@angular/core';
import { DRCustomerService } from 'src/app/services/drcustomer.service';
import { IngressService } from 'src/app/services/ingress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-drasset',
  templateUrl: './add-drasset.page.html',
  styleUrls: ['./add-drasset.page.scss'],
})
export class AddDRAssetPage implements OnInit {

  constructor(private drCustomerService: DRCustomerService,
    private ingressService: IngressService,
    private router: Router
  ) { }
  assetName;
  assetPower;

  ngOnInit() {
  }

  addDRAsset() {

    this.drCustomerService.addDRDevice(this.ingressService.loggedInUser.userId
      , this.assetName
      , this.assetPower).subscribe((res: any) => {
        if (res.response.key == "200") {
          console.log("Success");
          this.router.navigate(['druser-profile']);
        } else {
          window.alert("Something went wrong in the server");
        }
      }, (err) => {
        window.alert("Something went wrong in adding dr device");
      });

  }

}
