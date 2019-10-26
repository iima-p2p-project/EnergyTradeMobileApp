import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NavController} from '@ionic/angular';
import { IngressService } from 'src/app/services/ingress.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  selectedOption='sell';
  showSolar: boolean = true;
  showGenerator: boolean = true;
  showEV: boolean = true;

  solarCapacity: string;
  generatorCapacity: string;
  evCapacity: string;

  deviceCapactiy: string;

  userDeviceList: any;

  constructor(private router: Router
    , private route: ActivatedRoute
    , private nav:NavController
    , private ingressService: IngressService) { 
      this.showSolar = false;
      this.showGenerator = false;
      this.showEV = false;
    }

  ngOnInit() {
  }

  ionViewDidEnter() {

    //this.showSolar = true;
    //this.showGenerator = true;
    //this.showEV = true;

    this.route.queryParams.subscribe(params => {
      console.log('redirect : ' , params['redirect']);
      if(params['redirect'] == '/login') {
        this.userDeviceList = this.ingressService.getUserDevicesFromLocal();
        console.log('user devices from local : ' , this.userDeviceList);
        if(this.userDeviceList!=null){
          this.userDeviceList.forEach(element => {
            if(element.deviceId == 1) {
              console.log('1 : ' , element.deviceName);
              this.showSolar = true;
              this.solarCapacity = element.capacity;
            }
            if(element.deviceId == 2) {
              console.log('2 : ' , element.deviceName);
              this.showGenerator = true;
              this.generatorCapacity = element.capacity;
            }
            if(element.deviceId == 3) {
              console.log('3 : ' , element.deviceName);
              this.showEV = true;
              this.evCapacity = element.capacity;
            }
          });
        }
      }
      else {
        console.log(params['showSolar']);
        console.log(params['showGenerator']);
        console.log(params['showEV']);
        if (params['showSolar'] == "true") {
          this.showSolar = true;
          this.solarCapacity = params['solarCapacity'];
        }
        else {
          this.showSolar = false;
        }
        if (params['showGenerator'] == "true") {
          this.showGenerator = true;
          this.generatorCapacity = params['generatorCapacity'];
        }
        else {
          this.showGenerator = false;
        }
        if (params['showEV'] == "true") {
          this.showEV = true;
          this.evCapacity = params['evCapacity'];
        }
        else {
          this.showEV = false;
        }
      } 
    });
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

  selectSolarDeviceToSellPower() {
    this.deviceCapactiy = this.solarCapacity;
  }

  selectGeneratorDeviceToSellPower() {
    this.deviceCapactiy = this.generatorCapacity;
  }

  selectEVDeviceToSellPower() {
    this.deviceCapactiy = this.evCapacity;
  }
}
