import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { CancelInProfilePage } from '../cancel-in-profile/cancel-in-profile.page';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  selectedOption='upcoming';

  userId: any;
  resFromServer: any;
  upcomingContracts: any[] = [];
  upcomingSellOrders: any[] = [];
  completedContracts: any[] = [];
  completedSellOrders: any[] = [];

  allUpcomingOrders: any[] = [];
  allCompletedOrders: any[] = [];

  upcomingOrderListUpdated: any;
  completedOrderListUpdated: any;

  displayUpcomingOrderList: any;
  displayCompletedOrderList: any;

  constructor(
    public modal:ModalController
    , private adminService: AdminService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.allUpcomingOrders = [];
    this.allCompletedOrders = [];
    this.adminService.getUserOrdersByAdmin(this.userId).subscribe((res) => {
      this.resFromServer = res;
      if (this.resFromServer) {
        console.log("User Orders List:", this.resFromServer.response);
        if(this.resFromServer.response!=null) {
          this.upcomingSellOrders = this.resFromServer.response.upcomingSellOrders;
          this.upcomingContracts = this.resFromServer.response.upcomingContracts;
          this.completedSellOrders = this.resFromServer.response.completedSellOrders;
          this.completedContracts = this.resFromServer.response.completedContracts;
          if (this.upcomingSellOrders) {
            for (let i = 0; i < this.upcomingSellOrders.length; i++) {
              this.allUpcomingOrders.push(this.upcomingSellOrders[i]);
            }
          }
          if (this.upcomingContracts) {
            for (let i = 0; i < this.upcomingContracts.length; i++) {
              this.allUpcomingOrders.push(this.upcomingContracts[i]);
            }
          }
          if (this.completedSellOrders) {
            for (let i = 0; i < this.completedSellOrders.length; i++) {
              this.allCompletedOrders.push(this.completedSellOrders[i]);
            }
          }
          if (this.completedContracts) {
            for (let i = 0; i < this.completedContracts.length; i++) {
              this.allCompletedOrders.push(this.completedContracts[i]);
            }
          }
          console.log("All Upcoming Orders: ", this.allUpcomingOrders);
          console.log("All Completed Orders: ", this.allCompletedOrders);
          this.fineTuneOrderList();
        } 
      }
    })
  }

  fineTuneOrderList() {
    for (var i = 0; i < this.allUpcomingOrders.length; i++) {
      let obj = this.allUpcomingOrders[i];
      if (!obj.contractId) {
        obj.orderType = "sell";
        obj.orderId = obj.sellOrderId;
      } else if (obj.contractId) {
        obj.orderType = "buy";
        obj.orderId = obj.contractId;
        obj.transferStartTs = obj.sellorder.transferStartTs;
        obj.transferEndTs = obj.sellorder.transferEndTs;
      }
      if (obj.orderType == "sell")
        obj.month = moment(obj.transferStartTs).format('M');
      else
        obj.month = moment(obj.sellorder.transferStartTs).format('M');
      this.upcomingOrderListUpdated.push(obj);
    }
    console.log("Updated Upcoming Orders list", this.upcomingOrderListUpdated);
    this.displayUpcomingOrderList = this.upcomingOrderListUpdated;
    this.displayUpcomingOrderList.sort((ts1, ts2) => {
      return moment(ts2.transferStartTs).diff(ts1.transferStartTs);
    });

    for (var i = 0; i < this.allCompletedOrders.length; i++) {
      let obj = this.allCompletedOrders[i];
      if (!obj.contractId) {
        obj.orderType = "sell";
        obj.orderId = obj.sellOrderId;
      } else if (obj.contractId) {
        obj.orderType = "buy";
        obj.orderId = obj.contractId;
        obj.transferStartTs = obj.sellorder.transferStartTs;
        obj.transferEndTs = obj.sellorder.transferEndTs;
      }
      if (obj.orderType == "sell")
        obj.month = moment(obj.transferStartTs).format('M');
      else
        obj.month = moment(obj.sellorder.transferStartTs).format('M');
      this.completedOrderListUpdated.push(obj);
    }
    console.log("Updated Completed Orders list", this.completedOrderListUpdated);
    this.displayCompletedOrderList = this.completedOrderListUpdated;
    this.displayCompletedOrderList.sort((ts1, ts2) => {
      return moment(ts2.transferStartTs).diff(ts1.transferStartTs);
    });
  }

  segmentChanged($event)
  {
    // console.log($event.detail.value);
    this.selectedOption=$event.detail.value;
  }

  async openCancelModal()
  {
    let pqr=await this.modal.create({
      component:CancelInProfilePage,
      cssClass:'cancelx-custom-modal-css'
    })

    return await pqr.present();
  }

}
