import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { INGRESS_URL, CONFIG_URL } from 'src/app/environments/environments';
import { AllUser } from 'src/app/models/AllUser';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IngressService {

  loginUrl = INGRESS_URL + '/loginUser';
  sendOtpUrl = INGRESS_URL + '/sendOtp';
  generateOtpUrl = INGRESS_URL + '/generateOtp';
  verifyOtpUrl = INGRESS_URL + '/verifyOtp';
  getAllStateUrl = INGRESS_URL + '/getAllState';
  getStateBoardMappingUrl = INGRESS_URL + '/getStateBoardMapping';
  getStateLocalityMappingUrl = INGRESS_URL + '/getStateLocalityMapping';
  registerUrl = INGRESS_URL + '/registerUser';
  addDeviceUrl = INGRESS_URL + '/addDevice';
  getUserDevicesUrl = INGRESS_URL + '/getUserDevices';

  loggedInUser: AllUser;
  // loggedInUserId: string;
  // loggedInUserName: string;
  // loggedInUserRole: string;
  // loggedInUserStateId: string;
  // loggedInUserBoardId: string;
  // loggedInUserLocalityId: string;
  // loggedInUserLocalityName: string;
  // loggedInUserTypes: string[];
  userDevicesList: any;

  constructor(private httpClient: HttpClient
    , private storage: Storage
    , private router: Router
    , private events: Events) { }

  login(phoneNumber: string, otp: string) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    //return { 'recordStatus' : 2 };
    return this.httpClient.post(this.loginUrl
      , { "phone": phoneNumber, "otp": otp }
      , options
    );
  }

  async testLogin(userDetails) {
    return { 'recordStatus': 2 };
  }

  generateOtp(phoneNumber: string) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.generateOtpUrl
      , { "phone": phoneNumber }
      , options
    );
  }

  sendOtp(phoneNumber: string) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.sendOtpUrl
      , { "phone": phoneNumber }
      , options
    );
  }

  verifyOtp(phoneNumber: string, otp: string) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.verifyOtpUrl
      , { "phone": phoneNumber, "otp": otp }
      , options
    );
  }

  getAllStates() {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(this.getAllStateUrl
      , options
    );
  }

  getBoardsFromSelectedState(stateId: string) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(this.getStateBoardMappingUrl + '/' + stateId
      , options
    );
  }

  getLocalityFromSelectedState(stateId: string) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(this.getStateLocalityMappingUrl + '/' + stateId
      , options
    );
  }

  register(user: any) {
    console.log('register payload : ', user);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.registerUrl
      , user
      , options
    );
  }

  addDevice(deviceList: any) {
    console.log('device list : ', deviceList);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.addDeviceUrl
      , deviceList
      , options
    );
  }

  getUserDevices(userId: any) {
    console.log('user id : ', userId);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(this.getUserDevicesUrl + '/' + userId
      , options
    );
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  setLoggedInUser(userDetails) {
    let userTypes: string[] = [];
    let user: AllUser = new AllUser();
    user.userRole = userDetails.userRole;
    user.userId = userDetails.userId;
    user.localityId = userDetails.localityId;
    user.userName = userDetails.userName;
    user.usn = userDetails.uniqueServiceNumber;
    user.stateId = userDetails.stateId;
    user.boardId = userDetails.boardId;
    user.localityName = userDetails.localityName;

    for (let i = 0; i < userDetails.accessLevel.length; i++) {
      userTypes.push(userDetails.accessLevel[i].accessLevel);
    }
    user.userTypes = userTypes;
    this.loggedInUser = user;
    this.storage.set('LoggedInUser', user);
    this.events.publish("user:loggedin");
  }

  // getLoggedInUserId() {
  //   return this.loggedInUserId;
  // }

  // setLoggedInUserId(userId: string) {
  //   this.loggedInUserId = userId;
  // }

  // getUserDevicesFromLocal() {
  //   return this.userDevicesList;
  // }

  setUserDevices(deviceList: any) {
    this.userDevicesList = deviceList;
  }

  async getUserIdToken() {
    console.log("get token");
    if (!this.loggedInUser) {
      console.log("storage token");
      await this.storage.ready();
      const token = await this.storage.get('LoggedInUser');
      this.loggedInUser = token;
      this.events.publish("user:loggedin");
      //      this.loggedInUserTypes =  await this.storage.get('LoggedInUserTypes');
      if (token) {
        console.log("storage token recieved");
        this.loggedInUser = token;
      }
    }
    //console.log('user id token : ', this.loggedInUser.userId);
    return this.loggedInUser;
  }

  // async getUserStateToken() {
  //   console.log("get token");
  //   if (!this.loggedInUserStateId) {
  //     console.log("storage token");
  //     await this.storage.ready();
  //     const token = await this.storage.get('LoggedInUserStateId');
  //     if (token) {
  //       console.log("storage token recieved");
  //       this.loggedInUserStateId = token;
  //     }
  //   }
  //   console.log('user state token : ', this.loggedInUserStateId);
  //   return this.loggedInUserStateId;
  // }

  // async getUserLocalityNameToken() {
  //   console.log("get token");
  //   if (!this.loggedInUserLocalityName) {
  //     console.log("storage token");
  //     await this.storage.ready();
  //     const token = await this.storage.get('LoggedInUserLocalityName');
  //     if (token) {
  //       console.log("storage token recieved");
  //       this.loggedInUserLocalityName = token;
  //     }
  //   }
  //   console.log('user locality name token : ', this.loggedInUserLocalityName);
  //   return this.loggedInUserLocalityName;
  // }

  // async getUserNameToken() {
  //   console.log("get token");
  //   if (!this.loggedInUserName) {
  //     console.log("storage token");
  //     await this.storage.ready();
  //     const token = await this.storage.get('LoggedInUserName');
  //     if (token) {
  //       console.log("storage token recieved");
  //       this.loggedInUserName = token;
  //     }
  //   }
  //   console.log('user name token : ', this.loggedInUserName);
  //   return this.loggedInUserName;
  // }

  // async getUserRoleToken() {
  //   console.log("get token");
  //   if (!this.loggedInUserRole) {
  //     console.log("storage token");
  //     await this.storage.ready();
  //     const token = await this.storage.get('LoggedInUserRole');
  //     if (token) {
  //       console.log("storage token recieved");
  //       this.loggedInUserRole = token;
  //     }
  //   }
  //   console.log('user role token : ', this.loggedInUserRole);
  //   return this.loggedInUserRole;
  // }

  async getUserDevicesToken() {
    console.log("get token");
    if (!this.userDevicesList) {
      console.log("storage token");
      await this.storage.ready();
      const token = await this.storage.get('LoggedInUserDevices');
      if (token) {
        console.log("storage token recieved");
        this.userDevicesList = token;
      }
    }
    console.log('user devices token : ', this.userDevicesList);
    return this.userDevicesList;
  }

  async printStorageKeyValue(key: any) {
    console.log(key, ' : ', await this.storage.get(key));
  }

  logout(): Promise<boolean> {
    return this.storage.remove('LoggedInUser').then(() => {
      this.router.navigate(['/login']);
      return true;
    })
  }
}
