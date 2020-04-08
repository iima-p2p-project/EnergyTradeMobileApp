import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DRCustomerService } from 'src/app/services/drcustomer.service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.page.html',
  styleUrls: ['./customer-register.page.scss'],
})
export class CustomerRegisterPage implements OnInit {

  userType: any;
  errMsg;
  showError = false;

  contractFound = false;
  contractNumber;
  constructor(private router: Router,
    private drCustomerService: DRCustomerService) { }

  ngOnInit() {
  }
  contractDetails;

  next() {
    if (this.contractFound) {
      this.router.navigate(["/create-dr-user-account"], {
        queryParams: {
          redirect: "/customer-register",
          drContractNumber: this.contractNumber
        }
      });
    } else {
      //fetch Contract Details
      this.drCustomerService.getContractDetails(this.contractNumber).subscribe((res: any) => {
        this.contractDetails = res.response.contractDetails;
        console.log(this.contractDetails);
        if (this.contractDetails) {
          if (res.response.userCount > 0) {
            this.showError = true;
            this.errMsg = "The contract account already exists. Please 'Sign In' to continue.";
          } else {
            this.contractFound = true;
            this.showError = false;
          }
        }
        else {
          this.showError = true;
          this.errMsg = "We dont have any contract with this number. Please try again."
          console.log("Contract not found");
        }
      }, (err) => {
        console.log("Something went wrong in fetching ocntcat details");
      });

    }
  }

  signin() {
    this.router.navigateByUrl("/login");
  }



}
