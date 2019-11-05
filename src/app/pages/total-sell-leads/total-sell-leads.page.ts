import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-total-sell-leads',
  templateUrl: './total-sell-leads.page.html',
  styleUrls: ['./total-sell-leads.page.scss'],
})
export class TotalSellLeadsPage implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
  }

  selectSellLead() {
    this.router.navigate(['/profile'], {
      queryParams: {
      }
    });
  }

}
