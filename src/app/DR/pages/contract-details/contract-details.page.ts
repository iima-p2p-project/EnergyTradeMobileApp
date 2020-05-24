import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngressService } from 'src/app/services/ingress.service';
import { DRCustomerService } from 'src/app/services/drcustomer.service';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.page.html',
  styleUrls: ['./contract-details.page.scss'],
})
export class ContractDetailsPage implements OnInit {

  constructor(private route: ActivatedRoute
    , private drCustomerService: DRCustomerService
    , private ingressService: IngressService
    , private router: Router
  ) { }

  ngOnInit() {
  }
  contractDetails;
  customerProfileDetails

  ionViewWillEnter() {
    this.drCustomerService.getDRCustomerProfile(this.ingressService.loggedInUser.userId).subscribe((res: any) => {
      this.customerProfileDetails = res.response;
      this.contractDetails = this.customerProfileDetails.drContractDetails;
    }, (err: any) => {
      window.alert("Something went wrong in fetching DR Customer profile details");
    });
  }

  back() {
    this.router.navigate(['druser-profile']);
  }

}
