import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
})
export class AddDevicePage implements OnInit {

  Source_1 = true;
  Source_2 = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Next(){
    this.Source_1 = false;
    this.Source_2 = true;

  }

  SaveEnergySourcesDetails(){
    this.router.navigateByUrl('/home');
  }

}
