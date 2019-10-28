import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-buy-time-picker',
  templateUrl: './buy-time-picker.page.html',
  styleUrls: ['./buy-time-picker.page.scss'],
})
export class BuyTimePickerPage implements OnInit {

  screenMode:any;
  screenWidth:any;

  constructor(
    public platform:Platform
  ) { }

  ionViewWillEnter()
  {
    //determine if screen is big or small
    this.screenWidth=this.platform.width();
    if(this.screenWidth>760)
    {
      this.screenMode="big"
    }
    else
    {
      this.screenMode="small";
    }
  }

  ngOnInit() {
  }

}
