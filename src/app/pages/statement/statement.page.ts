import { Component, OnInit } from '@angular/core';
import { AllTxns } from 'src/app/models/AllTxns';
import { OrderService } from 'src/app/services/order.service';
import * as moment from 'moment';
import { IonDatetime } from '@ionic/angular';
import { IngressService } from 'src/app/services/ingress.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.page.html',
  styleUrls: ['./statement.page.scss'],
})
export class StatementPage implements OnInit {

  userId: any;
  
  fromDate: string = moment().startOf('month').toISOString();
  toDate: string = moment().endOf('month').toISOString();

  fromDateFormatted: string;
  toDateFormatted: string;

  totalEarnings: number;
  totalSpent: number;

  txnList: AllTxns[];
  txnListFromServer: any;

  resFromServer: any;
  response: any;

  constructor(private orderService: OrderService
    , private ingressService: IngressService) { }

  ngOnInit() {
    if (this.fromDate != null) {
      this.fromDateFormatted = this.fromDate.substring(0, 10);
    }
    if (this.toDate != null) {
      this.toDateFormatted = this.toDate.substring(0, 10);
    }
    this.ingressService.getUserIdToken().then((res) => {
      this.userId = res;
      this.orderService.getAllTradeByDate(this.fromDateFormatted, this.toDateFormatted, this.userId)
        .subscribe((res) => {
          this.resFromServer = res;
          if (this.resFromServer != null) {
            this.response = this.resFromServer.response;
            if (this.response != null) {
              this.totalEarnings = this.response.totalAmountEarned;
              this.totalSpent = this.response.totalAmountSpent;
              this.txnListFromServer = this.response.trades;
            }
          }
        });
    });
  }

  formatTime(ts, type) {
    console.log('format time param : ' , ts);
    if (type == 't')
      return moment(ts).format("hh:mm A");
    else if (type == 'd')
      return moment(ts).format("Do MMMM");
  }

  getFromDate() {
    if (this.fromDate != null) {
      this.fromDateFormatted = this.fromDate.substring(0, 10);
    }
    this.orderService.getAllTradeByDate(this.fromDateFormatted, this.toDateFormatted, this.userId)
      .subscribe((res) => {
        this.resFromServer = res;
        if (this.resFromServer != null) {
          this.response = this.resFromServer.response;
          if (this.response != null) {
            this.totalEarnings = this.response.totalAmountEarned;
            this.totalSpent = this.response.totalAmountSpent;
            this.txnListFromServer = this.response.trades;
          }
        }
      });
  }

  getToDate() {
    if (this.toDate != null) {
      this.toDateFormatted = this.toDate.substring(0, 10);
    }
    this.orderService.getAllTradeByDate(this.fromDateFormatted, this.toDateFormatted, this.userId)
      .subscribe((res) => {
        this.resFromServer = res;
        if (this.resFromServer != null) {
          this.response = this.resFromServer.response;
          if (this.response != null) {
            this.totalEarnings = this.response.totalAmountEarned;
            this.totalSpent = this.response.totalAmountSpent;
            this.txnListFromServer = this.response.trades;
          }
        }
      });
  }
}
