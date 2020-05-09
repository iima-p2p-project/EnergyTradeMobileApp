import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BuyOrderPayload } from 'src/app/models/BuyOrderPayload';
import { TimeService } from 'src/app/services/time.service';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractPayload } from 'src/app/models/ContractPayload';
import { AlertController } from '@ionic/angular';
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
  deviceTypeId: any;
  buyerId: any;
  showDot = false;

  sellerList: any[] = [];
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

  searchCount: any;
  searchDate: any;
  sortedSellerList;

  constructor(private timeService: TimeService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    public alert: AlertController,
    private pickerCtrl: PickerController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      this.deviceTypeId = params['deviceTypeId'];
      this.buyerId = params['buyerId'];
      this.unitMin = params['unitMin'];
      this.unitMax = params['unitMax'];
      this.startTime = params['startTime'] || '00:00:00 00';
      this.endTime = params['endTime'] || '00:00:00 00'
      this.budgetMin = params['budgetMin'];
      this.budgetMax = params['budgetMax'];

      this.buyOrderPayload.userId = this.buyerId;
      if (this.deviceTypeId != null && this.deviceTypeId != "") {
        this.buyOrderPayload.deviceTypeId = this.deviceTypeId;
      }
      else {
        this.buyOrderPayload.deviceTypeId = -1;
      }
      this.buyOrderPayload.minUnits = this.unitMin;
      this.buyOrderPayload.maxUnits = this.unitMax;
      this.buyOrderPayload.transferStartTs = this.startTime.substring(0, 10) + ' ' + this.startTime.substring(11, 16) + ':00';
      this.buyOrderPayload.transferEndTs = this.endTime.substring(0, 10) + ' ' + this.endTime.substring(11, 16) + ':00';;
      this.buyOrderPayload.minAmount = this.budgetMin;
      this.buyOrderPayload.maxAmount = this.budgetMax;
      this.orderService.searchBuyLeads(this.buyOrderPayload).subscribe((res) => {
        this.resFromServer = res;
        if (this.resFromServer != null) {
          this.sellerList = this.resFromServer.response.list;
          console.log("Sell Orders", this.sellerList);
          //adding filterd arrays
          this.sortedSellerList = this.sellerList.sort((res1, res2) => {
            let timeDistance = ((Math.abs(moment(res1.transferStartTs).diff(moment(this.startTime), 'minutes')) +
              Math.abs(moment(res1.transferEndTs).diff(moment(this.endTime), 'minutes')))) - ((Math.abs(moment(res2.transferStartTs).diff(moment(this.startTime), 'minutes')) +
                Math.abs(moment(res2.transferEndTs).diff(moment(this.endTime), 'minutes'))))
            return timeDistance;
          });

          this.displayedSellerList = this.sortedSellerList;

          this.evSellOrders = this.sellerList.filter(sellOrder => sellOrder.deviceTypeName == 'Battery');
          this.solarSellOrders = this.sellerList.filter(sellOrder => sellOrder.deviceTypeName == 'Solar');
          this.genSellOrders = this.sellerList.filter(sellOrder => sellOrder.deviceTypeName == 'Generator');
          this.orderService.sellerList = this.sellerList;
          this.searchCount = this.sellerList.length;
          this.searchDate = moment(this.startTime).format("Do MMM");
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
        sellOrderId: seller.sellOrderId,
        buyerId: this.buyerId,
        totalAmount: seller.totalAmount,
        ratePerUnit: seller.ratePerUnit,
        power: seller.powerToSell,
        energy: seller.energy,
        deviceTypeName: seller.deviceTypeName,
        startTime: this.getFormattedTime(seller.transferStartTs),
        endTime: this.getFormattedTime(seller.transferEndTs),
        date: this.getFormatteDate(seller.transferStartTs)
      }
    });
  }


  async sortSellRecords() {
    console.log("Sorting Sellers");

    let opts: PickerOptions = {
      buttons: [{
        text: 'OK'
        , role: 'done'
        , handler: async () => {
          let col = await picker.getColumn('sortOptions');
          console.log("Selected Col", col);
          this.sortKey = col.options[col.selectedIndex].value;
          console.log("Sort Key:", this.sortKey);
          //
          if (this.sortKey == 'h') {

            this.showDot = true;
            this.displayedSellerList.sort(function (a, b) {
              return b.totalAmount - a.totalAmount;
            });
          }
          else if (this.sortKey == 'l' || this.sortKey == 'r') {
            this.showDot = true;
            this.displayedSellerList.sort(function (a, b) {
              return a.totalAmount - b.totalAmount;
            });
          }
        }
      }, {
        text: 'CLEAR'
        , role: 'cancel'
        , handler: () => {
          this.displayedSellerList = this.sellerList;
          this.showDot = false;
        }
      }],
      columns: [{
        name: "sortOptions",
        options: [{ text: "Price - Low to High", value: "l" }
          , { text: "Price - High to Low", value: "h" }
          , { text: "Relevance", value: "r" }]
      }]
    }
    let picker = await this.pickerCtrl.create(opts)
    picker.present();
    // picker.onDidDismiss().then(async data => {
    //   let col = await picker.getColumn('sortOptions');
    //   console.log("Selected Col", col);
    //   this.sortKey = col.options[col.selectedIndex].value;
    //   console.log("Sort Key:", this.sortKey);
    //   //
    //   if (this.sortKey == 'h') {

    //     this.showDot = true;
    //     this.displayedSellerList.sort(function (a, b) {
    //       if (a.total_amount > b.total_amount)
    //         return -1;
    //     });
    //   }
    //   else if (this.sortKey == 'l' || this.sortKey == 'r') {
    //     this.showDot = true;
    //     this.displayedSellerList.sort(function (a, b) {
    //       if (a.total_amount < b.total_amount)
    //         return -1;
    //     });
    //   }
    // }
    // );
  }


  async filterSellRecords() {
    console.log("Filtering sell Sellers");

    let opts: PickerOptions = {
      buttons: [{ text: 'Ok', role: 'done' }],
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
        this.displayedSellerList = this.sortedSellerList;
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
