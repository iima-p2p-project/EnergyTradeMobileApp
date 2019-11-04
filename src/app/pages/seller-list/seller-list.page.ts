import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BuyOrderPayload } from 'src/app/models/BuyOrderPayload';
import { TimeService } from 'src/app/services/time.service';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractPayload } from 'src/app/models/ContractPayload';
import { PickerController } from '@ionic/angular';
import { PickerColumnOption, PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.page.html',
  styleUrls: ['./seller-list.page.scss'],
})
export class SellerListPage implements OnInit {

  buyOrderPayload: BuyOrderPayload = {};
  contractPayload: ContractPayload = {};
  buyerId: any;

  sellerList: any;
  displayedSellerList: any;
  formattedTime: any;
  formattedDate: any;

  startTime: string;
  endTime: string;

  budgetMin: any;
  budgetMax: any;

  unitMin: any;
  unitMax: any;

  resFromServer: any;
  filterKey;
  sortKey;
  evSellOrders;
  genSellOrders;
  solarSellOrders;

  constructor(private timeService: TimeService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private pickerCtrl: PickerController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      this.buyerId = params['buyerId'];
      this.unitMin = params['unitMin'];
      this.unitMax = params['unitMax'];
      this.startTime = params['startTime'];
      this.endTime = params['endTime'];
      this.budgetMin = params['budgetMin'];
      this.budgetMax = params['budgetMax'];

      this.buyOrderPayload.unitMin = this.unitMin;
      this.buyOrderPayload.unitMax = this.unitMax;
      this.buyOrderPayload.startTime = this.startTime;
      this.buyOrderPayload.endTime = this.endTime;
      this.buyOrderPayload.budgetMin = this.budgetMin;
      this.buyOrderPayload.budgetMax = this.budgetMax;
      this.orderService.searchBuyLeads(this.buyOrderPayload).subscribe((res) => {
        this.resFromServer = res;
        if (this.resFromServer != null) {
          this.sellerList = this.resFromServer.buyLeads;
          console.log("Sell Orders", this.sellerList);
          //adding filterd arrays
          this.displayedSellerList = this.sellerList;
          this.evSellOrders = this.sellerList.filter(sellOrder => sellOrder.device_type_id == '3');
          this.solarSellOrders = this.sellerList.filter(sellOrder => sellOrder.device_type_id == '1');
          this.genSellOrders = this.sellerList.filter(sellOrder => sellOrder.device_type_id == '2');
          this.orderService.sellerList = this.sellerList;
        }
      });
    });
  }

  getFormattedTime(time: any) {
    this.formattedTime = moment(time).format('hh:mm A');
    //console.log('Formatted Time : ', this.formattedTime);
    return this.formattedTime;
  }

  getFormatteDate(time: any) {
    this.formattedDate = moment(time).format('DD MMM YYYY');
    //console.log('Formatted Date : ', this.formattedDate);
    return this.formattedDate;
  }

  selectSeller(seller: any) {
    if (seller == null)
      return;
    console.log('selected seller : ', seller);

    this.router.navigate(['/order-details'], {
      queryParams: {
        sellOrderId: seller.sell_order_id,
        buyerId: this.buyerId,
        totalAmount: seller.total_amount,
        ratePerUnit: seller.rate_per_unit,
        power: seller.power_to_sell,
        startTime: this.getFormattedTime(seller.transfer_start_ts),
        endTime: this.getFormattedTime(seller.transfer_end_ts),
        date: this.getFormatteDate(seller.transfer_start_ts)
      }
    });
  }


  async sortSellRecords() {
    console.log("Sorting Sellers");

    let opts: PickerOptions = {
      buttons: [{ text: 'Ok', role: 'done' }, { text: 'Cancel', role: 'cancel' }],
      columns: [{
        name: "sortOptions",
        options: [{ text: "Price - Low to High", value: "l" }
          , { text: "Price - High to Low", value: "h" }
          , { text: "Relevance", value: "r" }]
      }]
    }
    let picker = await this.pickerCtrl.create(opts)
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('sortOptions');
      console.log("Selected Col", col);
      this.sortKey = col.options[col.selectedIndex].value;
      console.log("Sort Key:", this.sortKey);
      //
      if (this.sortKey == 'h') {
        this.displayedSellerList.sort(function (a, b) {
          if (a.total_amount > b.total_amount)
            return -1;
        });
      }
      else if (this.filterKey == 'l' || this.filterKey == 'r') {
        this.displayedSellerList.sort(function (a, b) {
          if (a.total_amount < b.total_amount)
            return -1;
        });
      }
    }
    );
  }


  async filterSellRecords() {
    console.log("Filtering sell Sellers");

    let opts: PickerOptions = {
      buttons: [{ text: 'Ok', role: 'done' }, { text: 'Cancel', role: 'cancel' }],
      columns: [{
        name: "filterOptions",
        options: [{ text: "Any", value: "a" }
          , { text: "Electric Vehicle", value: "e" }
          , { text: "Generator", value: "g" }
          , { text: "Solar", value: "s" }]
      }]
    }
    let picker = await this.pickerCtrl.create(opts)
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('filterOptions');
      console.log("Selected Col", col);
      this.filterKey = col.options[col.selectedIndex].value;
      console.log("Filter Key:", this.filterKey);
      //
      if (this.filterKey == 'a') {
        this.displayedSellerList = this.sellerList;
      }
      else if (this.filterKey == 'e') {
        this.displayedSellerList = this.evSellOrders;
      } else if (this.filterKey == 'g') {
        this.displayedSellerList = this.genSellOrders;
      } else if (this.filterKey == 's') {
        this.displayedSellerList = this.solarSellOrders;
      }
    }
    );
  }
}
