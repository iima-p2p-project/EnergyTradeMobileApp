import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-druser-profile',
  templateUrl: './druser-profile.page.html',
  styleUrls: ['./druser-profile.page.scss'],
})
export class DRUserProfilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToAssets() {
    this.router.navigate(['add-drasset']);
  }

}
