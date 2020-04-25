import { Component, HostListener } from '@angular/core';

import { Platform, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { IngressService } from 'src/app/services/ingress.service';
import { BackButtonService } from './services/back-button.service';

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
      title: 'Admin Dashboard',
      url: '/admin-dashboard',
      icon: 'people'
    },
    {
      title: 'Profile',
      url: 'profile',
      icon: 'contact'
    }
  ];

  userId: any;
  userName: any;
  userRole: any;
  localityName: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private ingressService: IngressService,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    private backButtonService: BackButtonService,
    private navCtrl: NavController

  ) {
    this.initializeApp();



  }

  ionViewDidEnter() {
  }

  setupPushNotif() {
    this.oneSignal.startInit('9b0a5ec6-e306-4aa7-9713-722d8ee1f47c', '701058302199');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);


    this.oneSignal.handleNotificationReceived().subscribe(data => {
      //this.showAlert(data.payload.body);
    });

    this.oneSignal.handleNotificationOpened().subscribe((data) => {
      this.showAlert(data.notification.payload.body);
    });

    this.oneSignal.endInit()
  }

  async showAlert(data) {

    const alert = await this.alertCtrl.create({
      header: data,
      buttons: ["Ok"]
    });
    alert.present();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setupPushNotif();

    });
  }

  navigateToAdminDashboard() {
    this.router.navigate(['/admin-dashboard'], {
      queryParams: {
      }
    });
  }

  navigateToCustomerList() {
    this.router.navigate(['/customers'], {
      queryParams: {
        userId: this.userId
      }
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

  logout() {
    //removing onesignal notification identifier
    // this.oneSignal.removeExternalUserId();
    this.ingressService.logout();
    // this.router.navigate(['/statement'], {
    //   queryParams: {
    //   }
    // });
  }

  getUserDetails() {
    this.ingressService.getUserNameToken().then((res) => {
      console.log('app component user name : ', res);
      this.userName = res;
      this.ingressService.loggedInUserName = this.userName;
      this.ingressService.getUserRoleToken().then((res) => {
        console.log('app component user role : ', res);
        this.userRole = res;
        this.ingressService.loggedInUserRole = this.userRole;
        this.ingressService.getUserLocalityNameToken().then((res) => {
          console.log('app component locality name : ', res);
          this.localityName = res;
          this.ingressService.loggedInUserLocalityName = this.localityName;
          this.ingressService.getUserIdToken().then((res) => {
            console.log('app component user id : ', res);
            this.userId = res;
            this.ingressService.loggedInUserId = this.userId;
          });
        });
      });
    });
  }

  navigateToProfile() {
    if (this.userRole == "User") {
      this.router.navigate(['/profile'], {
        queryParams: {
          userId: this.userId,
          flow: 'USER'
        }
      });
    }
  }

  @HostListener('document:backbutton')
  onBackButton() {
    if (this.backButtonService.quitOnBackButton) {
      if (window.confirm("Do you want to exit the app?")) {
        this.backButtonService.closeApp();
      }
    } else {
      this.navCtrl.back();
    }
  }


}
