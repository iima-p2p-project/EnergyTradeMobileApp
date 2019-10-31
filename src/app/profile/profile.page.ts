import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  selectedOption:any;

  constructor() { }

  ngOnInit() {
  }

  segmentChanged($event)
  {
    // console.log($event.detail.value);
    this.selectedOption=$event.detail.value;
  }

}
