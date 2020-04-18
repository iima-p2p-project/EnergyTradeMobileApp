import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-user-type',
  templateUrl: './choose-user-type.page.html',
  styleUrls: ['./choose-user-type.page.scss'],
})
export class ChooseUserTypePage implements OnInit {

  constructor(private router: Router) { }
  userType: any;

  ngOnInit() {
  }

  selectUserType(user) {
    if (user == 'p2p') {
      this.userType = 1;
      this.router.navigateByUrl("/create-account");
    }
    else if (user == 'dr')
    {
      this.userType = 2;
      this.router.navigateByUrl("/customer-register");
    }
  }

}
