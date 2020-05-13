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
  userRole: any;
  userStateId: any;
  buyLeadsCount: any = 0;
  sellLeadsCount: any = 0;
  orderCSS;
  nonTradeHourDisabled = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public modal: ModalController,
    public nav: NavController,
    private orderService: OrderService,
    private ingressService: IngressService,
    private timeService: TimeService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.ingressService.getUserRoleToken().then((res) => {
      this.userRole = res;
      if (this.userRole == 'User') {
        this.router.navigate(['/dashboard'], {
          queryParams: {
          }
        });
      }
    })
    this.ingressService.getUserIdToken().then((res) => {
      this.userId = res;
      if (this.userId) {
        this.ingressService.loggedInUserId = this.userId;
        this.ingressService.getUserStateToken().then((res) => {
          this.userStateId = res;
          this.ingressService.loggedInUserStateId = this.userStateId;
          this.adminService.getAllNonTradeHours(this.userId).subscribe((res) => {
            this.resFromServer = res;
            console.log('Non Trade Hours : ', this.resFromServer);
            this.nonTradeHourList = this.resFromServer.response.data;
            this.adminService.nonTradeHoursList = this.nonTradeHourList;
            this.adminService.getAllTrades(this.userId).subscribe((res) => {
              this.resFromServer = res;
              console.log('Trade Leads : ', this.resFromServer);
              this.allBuyLeads = this.resFromServer.response.contracts;
              this.adminService.allBuyLeads = this.allBuyLeads;
              this.allSellLeads = this.resFromServer.response.sellOrders;
              this.adminService.allSellLeads = this.allSellLeads;
              this.sellLeadsCount = this.resFromServer.response.totalSellLeads;
              this.adminService.sellLeadsCount = this.sellLeadsCount;
              this.buyLeadsCount = this.resFromServer.response.totalBuyLeads;
              this.adminService.buyLeadsCount = this.buyLeadsCount;
            });
          });
        });
      }
    })
  }

  async cancelModal(nonTradeHour: any, orderType: any) {
    let defg = await this.modal.create({
      component: CancelNonTradeHourPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        'orderId': nonTradeHour.nonTradeHourId,
        'orderType': orderType,
        'orderStartTime': this.formatTime(nonTradeHour.startTime, 't'),
        'orderEndTime': this.formatTime(nonTradeHour.endTime, 't'),
        'orderDate': this.formatTime(nonTradeHour.startTime, 'd')
      }
    });
    defg.onDidDismiss().then((dataReturned) => {
      this.ionViewDidEnter();
      if (dataReturned !== null) {
      }
    });
    return await defg.present();
  }

  formatTime(ts, type) {
    if (type == 't')
      return moment(ts).format("hh:mm A");
    else if (type == 'd')
      return moment(ts).format("Do MMM");
  }

  getDuration(startTime: string, endTime: string) {
    console.log('Admin Dashboard Duration : ', this.timeService.getDuration(startTime, endTime, ADMIN_ROLE));
    return (this.timeService.getDuration(startTime, endTime, ADMIN_ROLE).durationTime) / 60;
  }

  editNonTradeHours(nonTradeHour: any) {
    this.router.navigate(['/schedule'], {
      queryParams: {
        action: ACTION_EDIT,
        nonTradeHourId: nonTradeHour.nonTradeHourId,
        stateId: this.userStateId,
        localityName: nonTradeHour.locationName,
        localityId: nonTradeHour.localityId,
        startTime: nonTradeHour.startTime,
        endTime: nonTradeHour.endTime,
        nonTradeReason: nonTradeHour.nonTradeReason
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

  schedule() {
    console.log('schedule');
    this.router.navigate(['/schedule'], {
      queryParams: {
        callerPage: 'admin-dashboard',
        action: ACTION_CREATE,
        stateId: this.userStateId
      }
    });
  }

  viewAllCustomers() {
    this.router.navigate(['/customers'], {
      queryParams: {
        userId: this.userStateId
      }
    });
  }


  getCSS(nonTradeHour) {
    this.nonTradeHourDisabled = false;
    let nonTradeHourCSS = 'card-bottom card-center';
    if (nonTradeHour != null) {
      if (nonTradeHour.status == 'Cancelled') {
        this.nonTradeHourDisabled = true;
        nonTradeHourCSS = 'card-center card-bottom';
      } else if (nonTradeHour.isCancellable == 'N') {
        this.nonTradeHourDisabled = false;
        nonTradeHourCSS = 'card-center card-bottom';
      }
    }
    return nonTradeHourCSS;
  }
}
