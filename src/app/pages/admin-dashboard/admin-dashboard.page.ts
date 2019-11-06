import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';
import { IngressService } from 'src/app/services/ingress.service';
import { TimeService } from 'src/app/services/time.service';
import { AdminService } from 'src/app/services/admin.service';
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
  allBuyLeads: any;
  allSellLeads: any;
  userId: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public modal:ModalController,
    public nav:NavController,
    private orderService: OrderService,
    private ingressService: IngressService,
    private timeService: TimeService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.ingressService.getUserIdToken().then((res) => {
      this.userId = res;
      this.ingressService.loggedInUserId = this.userId;
      if (this.userId) {
        this.adminService.getAllNonTradeHours(this.userId).subscribe((res) => {
          this.resFromServer = res;
          console.log('Non Trade Hours : ' , this.resFromServer);
          this.nonTradeHourList = this.resFromServer.response.data;
          this.adminService.nonTradeHoursList = this.nonTradeHourList;
          this.adminService.getAllBuyLeads(this.userId).subscribe((res) => {
            this.resFromServer = res;
            console.log('Buy Leads : ' , this.resFromServer);
            this.allBuyLeads = this.resFromServer.response.response;
            this.adminService.allBuyLeads = this.allBuyLeads;
            this.adminService.getAllSellLeads(this.userId).subscribe((res) => {
              this.resFromServer = res;
              console.log('Sell Leads : ' , this.resFromServer);
              this.allSellLeads = this.resFromServer.response.response;
              this.adminService.allSellLeads = this.allSellLeads;
            })
          });
        });
      }
    })
  }

  async cancelModal(nonTradeHour: any) {
    let defg= await this.modal.create({
      component: CancelNonTradeHourPage,
      cssClass: 'cancel-custom-modal-css',
      componentProps: {
        'nonTradeHourId': nonTradeHour.nonTradeHourId,
      }
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
        nonTradeHourId: nonTradeHour.nonTradeHourId,
        startTime: nonTradeHour.startTime,
        endTime: nonTradeHour.endTi8me
      }
    });
  }

  cancelNonTradeHours(nonTradeHour: any) {
    this.router.navigate(['/schedule'], {
      queryParams: {
        action: ACTION_EDIT,
        nonTradeHourId: nonTradeHour.nonTradeHourId,
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
