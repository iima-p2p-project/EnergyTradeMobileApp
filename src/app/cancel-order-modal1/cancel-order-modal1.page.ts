import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cancel-order-modal1',
  templateUrl: './cancel-order-modal1.page.html',
  styleUrls: ['./cancel-order-modal1.page.scss'],
})
export class CancelOrderModal1Page implements OnInit {

  @Input() orderId: any;
  @Input() orderType: any;
  @Input() orderStartTime: any;
  @Input() orderEndTime: any;
  @Input() orderDate: any;

  constructor(
    public navParams: NavParams
    , public modal:ModalController
    , public adminService: AdminService
    , public orderService: OrderService
  ) { 
    this.orderId = navParams.get('orderId');
    this.orderType = navParams.get('orderType'); 
    console.log('order id : ' , this.orderId);
    console.log('order type : ' , this.orderType);
  }

  ngOnInit() {
  }

  close(){
    this.modal.dismiss();
  }

  yesAction() {
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
