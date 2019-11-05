import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';
import { IngressService } from 'src/app/services/ingress.service';
import { TimeService } from 'src/app/services/time.service';
import { CancelNonTradeHourPage } from '../cancel-non-trade-hour/cancel-non-trade-hour.page';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { ADMIN_ROLE, ACTION_CREATE, ACTION_EDIT } from 'src/app/environments/environments';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  resFromServer: any;
  nonTradeHourList: any;
  userId: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public modal:ModalController,
    public nav:NavController,
    private orderService: OrderService,
    private ingressService: IngressService,
    private timeService: TimeService,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.ingressService.getUserIdToken().then((res) => {
      this.userId = res;
      this.ingressService.loggedInUserId = this.userId;
      if (this.userId) {
        this.orderService.getAllNonTradeHours(this.userId).subscribe((res) => {
          this.resFromServer = res;
          console.log('Non Trade Hours : ' , this.resFromServer);
          this.nonTradeHourList = this.resFromServer.response.data;
          this.orderService.nonTradeHoursList = this.nonTradeHourList;
        });
      }
    })
  }

  async cancelModal() {
    let defg= await this.modal.create({
      component:CancelNonTradeHourPage,
      cssClass: 'cancel-custom-modal-css'
    })
    return await defg.present();
  }

  formatTime(ts, type) {
    if (type == 't')
      return moment(ts).format("hh:mm A");
    else if(type == 'd')
    return moment(ts).format("Do MMM");
  }

  getDuration(startTime: string, endTime: string) {
    return this.timeService.getDuration(startTime,endTime, ADMIN_ROLE);
  }

  editNonTradeHours(nonTradeHour: any) {
    this.router.navigate(['/schedule'], {
      queryParams: {
        action: ACTION_EDIT,
        startTime: nonTradeHour.startTime,
        endTime: nonTradeHour.endTi8me
      }
    });
  }

  showBuyLeads() {
    this.router.navigate(['/total-buy-leads'], {
      queryParams: {
      }
    });
  }

  showSellLeads() {
    this.router.navigate(['/total-sell-leads'], {
      queryParams: {
      }
    });
  }
}
