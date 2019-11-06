import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { TimeService } from 'src/app/services/time.service';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { ADMIN_ROLE, ACTION_CREATE, ACTION_EDIT } from 'src/app/environments/environments';

@Component({
  selector: 'app-total-sell-leads',
  templateUrl: './total-sell-leads.page.html',
  styleUrls: ['./total-sell-leads.page.scss'],
})
export class TotalSellLeadsPage implements OnInit {

  allSellLeads: any;

  constructor(private router: Router
    , private route: ActivatedRoute
    , private adminService: AdminService
    , private timeService: TimeService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.allSellLeads = this.adminService.allSellLeads;
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

  selectSellLead() {
    this.router.navigate(['/profile'], {
      queryParams: {
      }
    });
  }
}
