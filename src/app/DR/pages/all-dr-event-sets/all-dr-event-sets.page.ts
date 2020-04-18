import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-dr-event-sets',
  templateUrl: './all-dr-event-sets.page.html',
  styleUrls: ['./all-dr-event-sets.page.scss'],
})
export class AllDrEventSetsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showEventSetDetails(eventId){
    this.router.navigateByUrl('/event-set-details');
  }

}
