import { Component, HostListener } from '@angular/core';

import { Platform, AlertController, MenuController, Events, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { IngressService } from 'src/app/services/ingress.service';
import { ADMIN_ROLE, SUPPORT_NUMBER } from './environments/environments';

import { BackButtonService } from './services/back-button.service';
import { ONE_SIGNAL_APP_ID, FIREBASE_APP_ID } from './environments/environments';
import { CallNumber } from '@ionic-native/call-number/ngx';

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
  userRole: any = "Admin"
  userType: any = 2;
  localityName: any;
  selectedUserPersona = "DR";
  availablePersonas: string[];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private ingressService: IngressService,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    private menu: MenuController,
    private events: Events,
    private backButtonService: BackButtonService,
    private navCtrl: NavController,
    private callNumber: CallNumber
  ) {
    this.initializeApp();

    events.subscribe('user:loggedin', () => {
      this.getUserDetails();
    });

    events.subscribe('user:setAppComponentData', () => {
      this.setAppComponentData();
    });
  }

  ionViewDidEnter() {

    console.log("open Side panel");


  }

  setupPushNotif() {

    this.oneSignal.startInit(ONE_SIGNAL_APP_ID, FIREBASE_APP_ID);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification)


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

  disableBackButton() {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      document.addEventListener('backbutton', function (event) {
        event.preventDefault();
        event.stopPropagation();
      }, false);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
     // this.disableBackButton();
      this.statusBar.styleBlackTranslucent();
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

  checkinAvailablePersonas(persona) {
    if (this.availablePersonas)
      return this.availablePersonas.includes(persona);
  }

  setAppComponentData() {
    this.availablePersonas = this.ingressService.loggedInUser.userTypes;
    this.userName = this.ingressService.loggedInUser.userName;
    this.selectedUserPersona = "P2P";
  }

  getUserDetails() {
    if (this.ingressService.loggedInUser) {

      //   this.localityName = this.ingressService.userP2PDetails.localityName;
      //this.loggedInUser = this.ingressService.loggedInUser;
      this.availablePersonas = this.ingressService.loggedInUser.userTypes;
      this.userRole = this.ingressService.loggedInUser.userRole;
      if (this.availablePersonas.includes("DR")) {
        this.selectedUserPersona = "DR";
        this.router.navigate(["customer-dashboard"]);
      } else {
        this.selectedUserPersona = "P2P";
        if (this.userRole == ADMIN_ROLE) {
          this.router.navigate(["admin-dashboard"]);
        } else {
          this.router.navigate(["dashboard"]);
        }
      }


      this.userName = this.ingressService.loggedInUser.userName;

      // this.ingressService.getUserRoleToken().then((res) => {
      // console.log('app component user role : ', res);
      // this.userRole = res;
      // this.ingressService.loggedInUserRole = this.userRole;

      //     this.ingressService.getUserLocalityNameToken().then((res) => {
      //       console.log('app component locality name : ', res);
      //       this.localityName = res;
      //       this.ingressService.loggedInUserLocalityName = this.localityName;
      //       this.ingressService.getUserIdToken().then((res) => {
      //         console.log('app component user id : ', res);
      //         this.userId = res;
      //         this.ingressService.loggedInUserId = this.userId;
      //       });
      //     });
      //   });
      // });
    }
  }

  navigateToProfile() {
    if (this.selectedUserPersona == "P2P") {
      this.router.navigate(['/profile'], {
        queryParams: {
          userId: this.userId,
          flow: 'USER'
        }
      });
    } else if (this.selectedUserPersona == "DR") {
      this.router.navigate(['druser-profile'], {
        queryParams: {
          userId: this.userId,
          flow: 'DRCustomer'
        }
      });
    }
  }

  changePersona(persona) {
    if (persona == 'dr') {
      this.selectedUserPersona = "DR";
      this.router.navigateByUrl('/customer-dashboard');
      this.menu.close();
    } else {
      this.selectedUserPersona = "P2P";
      this.router.navigateByUrl('/dashboard');
      this.menu.close();
    }
  }

  navigateToDRDashboard() {
    this.router.navigate(['customer-dashboard']);
  }

  navigateToAllDREvents() {
    this.router.navigate(['all-events']);

  }
  // @HostListener('document:backbutton')
  // onBackButton() {
  //   if (this.backButtonService.quitOnBackButton) {
  //     if (window.confirm("Do you want to exit the app?")) {
  //       this.backButtonService.closeApp();
  //     }
  //   } else {
  //     this.navCtrl.back();
  //   }
  // }
  callHelp() {
    this.callNumber.callNumber(SUPPORT_NUMBER, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  showSettings() {
    window.alert("This is an upcoming functionality");
  }

}
