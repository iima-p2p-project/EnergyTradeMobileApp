import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AllCustomer } from 'src/app/models/AllCustomer';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  userId: any;
  customerList: AllCustomer[] = [];
  resFromService: any;

  constructor(private adminService: AdminService
    , private route: ActivatedRoute
    , private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.adminService.getUsersByAdmin(this.userId).subscribe((res) => {
      this.resFromService=res;
      if(this.resFromService!=null) {
        this.customerList=this.resFromService.response.response;
        this.adminService.customerList=this.customerList;
      }
    });
  }

  getTotalOrders(buyOrders: number, sellOrders: number) {
    return buyOrders+sellOrders;
  }

  selectCustomer(customer: AllCustomer) {
    this.router.navigate(['/profile'], {
      queryParams: {
        userId: customer.userId
      }
    });
  }
}
