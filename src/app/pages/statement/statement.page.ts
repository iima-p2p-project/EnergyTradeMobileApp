import { Component, OnInit } from '@angular/core';
import { AllTxns } from 'src/app/models/AllTxns';
import { OrderService } from 'src/app/services/order.service';
import * as moment from 'moment';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.page.html',
  styleUrls: ['./statement.page.scss'],
})
export class StatementPage implements OnInit {

  fromDate: any = new Date().toISOString();
  toDate: any = new Date().toISOString();

  totalEarnings: number;
  totalSpent: number;

  txnList: AllTxns[];

  resFromServer: any;
  response: any;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAllTradeByDate({startDate: '01/01/2020', endDate: '31/01/2020'}, 1)
    .subscribe((res) => {
      this.resFromServer=res;
      if(this.resFromServer!=null) {
        this.response=this.resFromServer.response;
        if(this.response!=null) {
          this.totalEarnings=this.response.totalAmountEarned;
          this.totalSpent=this.response.totalAmountSpent;
          this.txnList=this.response.sellOrders;
        }
      }
    });
  }

  formatTime(ts, type) {
    console.log('format time param : ' , ts);
    if (type == 't')
      return moment(ts).format("hh:mm A");
    else if (type == 'd')
      return moment(ts).format("Do MMMM");
  }
}
