import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AllCustomer } from 'src/app/models/AllCustomer';
import { Router, ActivatedRoute } from '@angular/router';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  userId: any;
  customerList: AllCustomer[] = [];
  resFromService: any;
  monthFilterKey;
  locationFilterKey;
  displayCustomerList;
  selectedCustomer: any;

  constructor(private adminService: AdminService
    , private route: ActivatedRoute
    , private router: Router
    , private pickerCtrl: PickerController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      console.log('user id in customer page : ', this.userId);
    });
    this.adminService.getUsersByAdmin(this.userId).subscribe((res) => {
      this.resFromService = res;
      console.log('customers : ', res);
      if (this.resFromService != null) {
        this.customerList = this.resFromService.response.response;
        this.adminService.customerList = this.customerList;
        this.displayCustomerList = this.customerList;
      }
    });
  }

  getTotalOrders(buyOrders: number, sellOrders: number) {
    return buyOrders + sellOrders;
  }

  selectCustomer(customer: AllCustomer) {
    this.router.navigate(['/profile'], {
      queryParams: {
        userId: customer.userId,
        flow: 'ADMIN'
      }
    });
  }

  async filterByMonth() {
    console.log("Apply Month Filter");
    let opts: PickerOptions = {
      buttons: [{ text: 'Ok', role: 'done' }, { text: 'Cancel', role: 'cancel' }],
      columns: [{
        name: "monthOptions",
        options: [{ text: "January", value: "1" }
          , { text: "February", value: "2" }
          , { text: "March", value: "3" }
          , { text: "April", value: "4" }
          , { text: "May", value: "5" }
          , { text: "June", value: "6" }
          , { text: "July", value: "7" }
          , { text: "August", value: "8" }
          , { text: "September", value: "9" }
          , { text: "October", value: "10" }
          , { text: "November", value: "11" }
          , { text: "December", value: "12" }]
      }]
    }
    let picker = await this.pickerCtrl.create(opts)
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('monthOptions');
      this.monthFilterKey = col.options[col.selectedIndex].value;
      console.log("customer : ", this.customerList);
      //this.displayCustomerList = this.customerList.filter(customer => moment(customer.transferStartTs).format('M') == this.monthFilterKey);
    }
    );
  }


  async filterByLocation() {
    console.log("Apply Location Filter");
    let opts: PickerOptions = {
      buttons: [{ text: 'Ok', role: 'done' }],
      columns: [{
        name: "monthOptions",
        options: [{ text: "Tarnaka", value: "Tarnaka" }
          , { text: "Nizamabad", value: "Nizamabad" }
          , { text: "Shimachalam", value: "Shimachalam" }
          , { text: "Lingampalli", value: "Lingampalli" }
          , { text: "All", value: "All" }
        ]
      }]
    }
    let picker = await this.pickerCtrl.create(opts)
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('monthOptions');
      this.locationFilterKey = col.options[col.selectedIndex].value;
      console.log("Filter Key:", this.locationFilterKey);
      if (this.locationFilterKey != 'All') {
        this.displayCustomerList = this.customerList.filter(customer => customer.localityName == this.locationFilterKey);
      } else {
        this.displayCustomerList = this.customerList;
      }
    }
    );
  }

  searchCustomer() {
    if(this.selectedCustomer!=null) {
      this.displayCustomerList = this.customerList.filter(customer => customer.fullName.includes(this.selectedCustomer));
    }
  }
}


