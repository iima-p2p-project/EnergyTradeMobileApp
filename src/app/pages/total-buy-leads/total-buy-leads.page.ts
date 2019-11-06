import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { TimeService } from 'src/app/services/time.service';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { ADMIN_ROLE, ACTION_CREATE, ACTION_EDIT } from 'src/app/environments/environments';

@Component({
  selector: 'app-total-buy-leads',
  templateUrl: './total-buy-leads.page.html',
  styleUrls: ['./total-buy-leads.page.scss'],
})
export class TotalBuyLeadsPage implements OnInit {

  allBuyLeads: any;

  constructor(private router: Router
    , private route: ActivatedRoute
    , private adminService: AdminService
    , private timeService: TimeService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.allBuyLeads = this.adminService.allBuyLeads;
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

  selectBuyLead() {
    this.router.navigate(['/profile'], {
      queryParams: {
      }
    });
  }
}
