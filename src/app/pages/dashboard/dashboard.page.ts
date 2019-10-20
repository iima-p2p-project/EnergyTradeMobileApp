import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private router: Router
    , private route: ActivatedRoute) { }

  ngOnInit() {
  }

  initiateSellFlow(sellFlowDetails: any) {
    this.router.navigate(['/sell-time-picker'], {
      queryParams: {
        deviceName: sellFlowDetails.deviceName,
        power: sellFlowDetails.power
      }
    });
  }

  initiateBuyFlow(buyFlowDetails: any) {
    this.router.navigate(['/buy-timee-picker'], {
      queryParams: {
        deviceName: buyFlowDetails.deviceName,
        power: buyFlowDetails.power
      }
    });
  }

}
