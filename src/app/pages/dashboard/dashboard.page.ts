import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  selectedOption='sell';

  constructor(
    private router: Router,
    private nav:NavController,
    private route: ActivatedRoute
  ) { }

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

  segmentChanged($event)
  {
    // console.log($event.detail.value);
    this.selectedOption=$event.detail.value;
  }

  go()
  {
    if(this.selectedOption=='sell')
    {
      //store numbers in services
      this.nav.navigateForward('sell-time-picker');
    }
    else if(this.selectedOption=='buy')
    {
      this.nav.navigateForward('buy-time-picker');
    }
  }

}
