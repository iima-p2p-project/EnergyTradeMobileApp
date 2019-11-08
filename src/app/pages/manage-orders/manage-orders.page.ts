import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { IngressService } from 'src/app/services/ingress.service';
import * as moment from 'moment';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { CancelNonTradeHourPage } from '../cancel-non-trade-hour/cancel-non-trade-hour.page';
import { ModalController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ACTION_CREATE, ACTION_EDIT } from 'src/app/environments/environments';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.page.html',
  styleUrls: ['./manage-orders.page.scss'],
})
export class ManageOrdersPage implements OnInit {
  orderTypeImageUrl: any;
  resFromServer: any;
  orderList: any;
  orderListUpdated: any = [];
  orderType: any;
  userId: any;
  periodFilterKey;
  allOrders;
  cancelledOrders;
  futureOrders;
  pastOrders;
  displayOrderList;
  monthFilterKey;
  energyTypeFilterKey;

  constructor(private orderService: OrderService
    , private ingressService: IngressService
    , private cdr: ChangeDetectorRef
    , private pickerCtrl: PickerController
    , public modal:ModalController
    , private router: Router
    , private route: ActivatedRoute) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.ingressService.getUserIdToken().then((res) => {
      this.userId = res;
      if (this.userId) {
        this.orderService.getAllOrdersAndContracts(this.userId).subscribe((res) => {
          this.resFromServer = res;
          this.orderList = this.resFromServer.ordersAndContracts;

          console.log("Orders List:", this.allOrders);
          this.orderService.orderList = this.orderList;
          this.fineTuneOrderList();
        });
      }
    })
  }

  fineTuneOrderList() {
    for (var i = 0; i < this.orderList.length; i++) {
      let obj = this.orderList[i];
      if (obj.seller_id == this.userId) {
        obj.orderType = "sell";
        obj.orderId = obj.sell_order_id;
      } else if (obj.buyer_id == this.userId) {
        obj.orderType = "buy";
        obj.orderId = obj.contract_id;
      }
      obj.month = moment(obj.transfer_start_ts).format('M');
      this.orderListUpdated.push(obj);
    }
    console.log("Updated orders list", this.orderListUpdated);
    this.displayOrderList = this.orderListUpdated;
    this.allOrders = this.orderListUpdated;
    this.cancelledOrders = this.orderListUpdated.filter(order => order.active_status == '2');
    this.futureOrders = this.orderListUpdated.filter(order => moment(order.transfer_start_ts).isAfter(moment.now()));
    this.pastOrders = this.orderListUpdated.filter(order => moment(order.transfer_start_ts).isBefore(moment.now()));
  }

  getOrderId(order: any) {
    if (order.seller_id) {
      this.orderTypeImageUrl = "assets/svg/sell (1).svg";
      this.orderType = 'SELL';
      return order.sell_order_id;
    }
    if (order.buyer_id) {
      this.orderTypeImageUrl = "assets/svg/buy (1).svg";
      this.orderType = 'BUY';
      return order.contract_id;
    }
  }

  formatTime(ts, type) {
    if (type == 't')
      return moment(ts).format("hh:mm A");
    else if (type == 'd')
      return moment(ts).format("Do MMM");
  }

  async applyPeriodFilter() {
    console.log("Apply Period Filter");

    let opts: PickerOptions = {
      buttons: [{ text: 'Ok', role: 'done' }, { text: 'Cancel', role: 'cancel' }],
      columns: [{
        name: "periodOptions",
        options: [{ text: "All", value: "a" }
          , { text: "Canceled", value: "c" }
          , { text: "Future", value: "f" }
          , { text: "Past", value: "p" }]
      }]
    }
    let picker = await this.pickerCtrl.create(opts)
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('periodOptions');
      console.log("Selected Col", col);
      this.periodFilterKey = col.options[col.selectedIndex].value;
      console.log("Filter Key:", this.periodFilterKey);
      if (this.periodFilterKey == 'a')
        this.displayOrderList = this.allOrders;
      else if (this.periodFilterKey == 'c')
        this.displayOrderList = this.cancelledOrders;
      else if (this.periodFilterKey == 'f')
        this.displayOrderList = this.futureOrders;
      else if (this.periodFilterKey == 'p')
        this.displayOrderList = this.pastOrders;
      else
        this.displayOrderList = this.allOrders;

    }
    );
  }
  async applyMonthFilter() {
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
      console.log("Filter Key:", this.monthFilterKey);
      this.displayOrderList = this.allOrders.filter(order => order.month == this.monthFilterKey);
    }
    );
  }
  async applyEnergyFilter() {
    console.log("Apply Month Filter");
    let opts: PickerOptions = {
      buttons: [{ text: 'Ok', role: 'done' }, { text: 'Cancel', role: 'cancel' }],
      columns: [{
        name: "energyTypeOptions",
        options: [{ text: "Electric Vehicle (EV)", value: "Electric Vehicle" }
          , { text: "Solar", value: "Solar" }
          , { text: "Generator", value: "Generator" }]
      }]
    }
    let picker = await this.pickerCtrl.create(opts)
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('energyTypeOptions');
      this.energyTypeFilterKey = col.options[col.selectedIndex].value;
      console.log("Filter Key:", this.energyTypeFilterKey);
      this.displayOrderList = this.allOrders.filter(order => order.device_type_name == this.energyTypeFilterKey);
    }
    );
  }

  editSellOrder(order: any) {
    this.router.navigate(['/sell-time-picker'], {
      queryParams: {
        action: ACTION_EDIT,
        sellOrderId: order.sell_order_id,
        sellerId: this.userId,
        userDeviceId: order.user_device_id,
        deviceTypeId: order.device_type_id,
        powerToSell: order.power_to_sell,
        startTime: order.transfer_start_ts,
        endTime: order.transfer_end_ts
      }
    });
  }

  async cancelModal(order: any , orderType: any) {
    let defg= await this.modal.create({
      component: CancelNonTradeHourPage,
      cssClass: 'cancel-custom-modal-css',
      componentProps: {
        'orderId': this.getOrderId(order),
        'orderType': orderType
      }
    })
    return await defg.present();
  }
}
