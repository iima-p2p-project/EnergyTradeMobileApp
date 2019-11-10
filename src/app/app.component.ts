import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { IngressService } from 'src/app/services/ingress.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title:'Admin Dashboard',
      url:'/admin-dashboard',
      icon:'people'
    },
    {
      title:'Profile',
      url:'profile',
      icon:'contact'
    }
  ];

  userId: any;
  userName: any;
  localityName: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private ingressService: IngressService
  ) {
    this.initializeApp();
  }

  ionViewDidEnter() {
    this.ingressService.getUserNameToken().then((res) => {
      this.userName = res;
      this.ingressService.loggedInUserName = this.userName;
      this.ingressService.getUserLocalityNameToken().then((res) => {
        this.localityName = res;
        this.ingressService.loggedInUserLocalityName = this.localityName;
      })
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  navigateToSell() {
    this.router.navigate(['/dashboard'], {
      queryParams: {
        tab: 'sell'
      }
    });
  }

  navigateToBuy() {
    this.router.navigate(['/dashboard'], {
      queryParams: {
        tab: 'buy'
      }
    });
  }
  
  logout(){
    this.ingressService.logout();
  }
}
