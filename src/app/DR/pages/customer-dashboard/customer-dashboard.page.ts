import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.page.html',
  styleUrls: ['./customer-dashboard.page.scss'],
})
export class CustomerDashboardPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  viewAllEventSets(){
    this.router.navigateByUrl('/all-dr-event-sets');
  }
  showEventSetDetails(eventId){
    this.router.navigateByUrl('/event-set-details');
  }

}
