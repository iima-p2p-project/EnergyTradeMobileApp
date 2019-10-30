import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { IngressService } from 'src/app/services/ingress.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.page.html',
  styleUrls: ['./manage-orders.page.scss'],
})
export class ManageOrdersPage implements OnInit {
  orderTypeImageUrl: any;
  resFromServer: any;
  orderList: any;
  orderType: any;
  userId: any;

  constructor(private orderService: OrderService
    , private ingressService: IngressService
    , private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.ingressService.getUserIdToken().then((res) => {
      this.userId = res;
      if(this.userId) {
        this.orderService.getAllOrdersAndContracts(this.userId).subscribe((res) => {
          this.resFromServer = res;
          this.orderList = this.resFromServer.ordersAndContracts;
          this.cdr.detectChanges();
        });
      }
    })
  }

  getOrderId(order: any) {
    if(order.seller_id) {
      this.orderTypeImageUrl="assets/svg/sell (1).svg";
      this.orderType = 'SELL';
      return order.sell_order_id;
    }
    if(order.buyer_id) {
      this.orderTypeImageUrl="assets/svg/buy (1).svg";
      this.orderType = 'BUY';
      return order.contract_id;
    }
  }
}
