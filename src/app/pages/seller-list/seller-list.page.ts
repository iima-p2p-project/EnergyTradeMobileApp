import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BuyOrderPayload } from 'src/app/models/BuyOrderPayload';
import { TimeService } from 'src/app/services/time.service';
import { OrderService} from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractPayload } from 'src/app/models/ContractPayload';

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
  formattedTime: any;
  formattedDate: any;

  startTime: string;
  endTime: string;

  budgetMin: any;
  budgetMax: any;

  unitMin: any;
  unitMax: any;

  resFromServer: any;

  constructor(private timeService: TimeService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router) { }

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
      this.orderService.searchBuyLeads(this.buyOrderPayload).subscribe( (res) => {
        this.resFromServer = res;
        if(this.resFromServer != null) {
          this.sellerList = this.resFromServer.buyLeads;
          this.orderService.sellerList = this.sellerList;
        }
      });
    });
  }

  getFormattedTime(time: any) {
    this.formattedTime = moment(time).format('hh:mm A');
    console.log('Formatted Time : ' , this.formattedTime);
    return this.formattedTime;
  }

  getFormatteDate(time: any) {
    this.formattedDate = moment(time).format('DD MMM YYYY');
    console.log('Formatted Date : ' , this.formattedDate);
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
        startTime: this.getFormattedTime(seller.transfer_start_ts),
        endTime: this.getFormattedTime(seller.transfer_end_ts),
        date: this.getFormatteDate(seller.transfer_start_ts)
      }
    });
  }
}
