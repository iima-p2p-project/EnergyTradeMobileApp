import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-non-trade-hours-alert',
  templateUrl: './non-trade-hours-alert.page.html',
  styleUrls: ['./non-trade-hours-alert.page.scss'],
})
export class NonTradeHoursAlertPage implements OnInit {

  @Input() orderId: any;
  @Input() orderType: any;
  @Input() orderPayload: any;

  constructor(public navParams: NavParams,
    public modal:ModalController
    , public adminService: AdminService
    , public orderService: OrderService
  ) { 
    this.orderId = navParams.get('orderId');
    this.orderType = navParams.get('orderType'); 
    this.orderPayload = navParams.get('orderPayload');
    console.log('order id : ' , this.orderId);
    console.log('order type : ' , this.orderType);
  }

  ngOnInit() {
  }

  close(action: any){
    this.modal.dismiss({action: action});
  }

  noAction() {
    this.close('NO');
  }

  yesAction() {
    if(this.orderType == 'NONTRADEHOUR') {
      this.adminService.editNonTradeHour(this.orderPayload, this.orderId).subscribe((res) => {
        console.log('response from edit non trade hours service : ', res);
        this.close('YES');
      });
    }
  }
}
