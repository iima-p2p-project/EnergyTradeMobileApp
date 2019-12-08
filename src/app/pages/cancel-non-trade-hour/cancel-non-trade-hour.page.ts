import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cancel-non-trade-hour',
  templateUrl: './cancel-non-trade-hour.page.html',
  styleUrls: ['./cancel-non-trade-hour.page.scss'],
})
export class CancelNonTradeHourPage implements OnInit {

  @Input() orderId: any;
  @Input() orderType: any;
  @Input() orderStartTime: any;
  @Input() orderEndTime: any;
  @Input() orderDate: any;

  constructor(public navParams: NavParams
    , public modal:ModalController
    , public adminService: AdminService
    , public orderService: OrderService) {
      this.orderId = navParams.get('orderId');
      this.orderType = navParams.get('orderType'); 
      this.orderStartTime = navParams.get('orderStartTime'); 
      this.orderEndTime = navParams.get('orderEndTime'); 
      this.orderDate = navParams.get('orderDate'); 
      console.log('order id : ' , this.orderId);
      console.log('order type : ' , this.orderType);
    }

  ngOnInit() {
  }

  close(){
    this.modal.dismiss();
  }

  noAction() {
    this.close();
  }

  yesAction() {
    if(this.orderType == 'NONTRADEHOUR') {
      this.adminService.cancelNonTradeHour({status: "CANCEL"} , this.orderId).subscribe((res) => {
        console.log('response from cancel non trade hour service : ' , res);
        this.close();
      });
    }
    if(this.orderType == 'BUY') {
      this.orderService.cancelBuyOrder(this.orderId).subscribe((res) => {
        console.log('response from cancel buy order service : ' , res);
        this.close();
      });
    }
    if(this.orderType == 'SELL') {
      this.orderService.cancelSellOrder(this.orderId).subscribe((res) => {
        console.log('response from cancel sell order service : ' , res);
        this.close(); 
      });
    }
  }
}
