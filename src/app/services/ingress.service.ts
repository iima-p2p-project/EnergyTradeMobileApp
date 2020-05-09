import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { INGRESS_URL } from 'src/app/environments/environments';
import { User } from 'src/app/models/User';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { UserP2PDetails } from '../models/UserP2PDetails';

@Injectable({
  providedIn: 'root'
})
export class IngressService {

  loginUrl = INGRESS_URL + '/loginUser';
  sendRegistrationOTPUrl = INGRESS_URL + '/sendRegistrationOTP';
  sendLoginOTPUrl = INGRESS_URL + '/sendLoginOTP';
  verifyOtpUrl = INGRESS_URL + '/verifyOtp';
  getAllStateUrl = INGRESS_URL + '/getAllState';
  getStateBoardMappingUrl = INGRESS_URL + '/getStateBoardMapping';
  getStateLocalityMappingUrl = INGRESS_URL + '/getStateLocalityMapping';
  registerUrl = INGRESS_URL + '/registerUser';
  addDeviceUrl = INGRESS_URL + '/addDevice';
  getUserDevicesUrl = INGRESS_URL + '/getUserDevices';
  getP2PUserProfileUrl = INGRESS_URL + '/getp2pUserProfile';

  loggedInUser: User;
  userP2PDevices: any;
  userP2PDetails: UserP2PDetails;
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

  sendLoginOTP(phoneNumber: string) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.sendLoginOTPUrl
      , { "phone": phoneNumber }
      , options
    );
  }

  sendRegistrationOTP(phoneNumber: string, userType: string) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.sendRegistrationOTPUrl
      , {
        "phone": phoneNumber,
        "userType": userType
      }
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

  // getLoggedInUser() {
  //   return this.loggedInUser;
  // }

  setLoggedInUser(userDetails) {
    let userTypes: string[] = [];
    let user: User = new User();
    user.userId = userDetails.userId;
    user.userName = userDetails.userName;
    user.phoneNumber = userDetails.phoneNumber;
    user.userRole = userDetails.userRole;
    for (let i = 0; i < userDetails.userTypes.length; i++) {
      userTypes.push(userDetails.userTypes[i].accessLevel);
    }
    user.userTypes = userTypes;
    this.loggedInUser = user;
    this.storage.set('LoggedInUser', user);

  }





  // setLoggedInUser(userDetails) {
  //   let userTypes: string[] = [];
  //   let user: AllUser = new AllUser();
  //   user.userRole = userDetails.userRole;
  //   user.userId = userDetails.userId;
  //   user.localityId = userDetails.localityId;
  //   user.userName = userDetails.userName;
  //   user.usn = userDetails.uniqueServiceNumber;
  //   user.stateId = userDetails.stateId;
  //   user.boardId = userDetails.boardId;
  //   user.localityName = userDetails.localityName;
  //   user.drContractNumber = userDetails.userDetails;
  //   user.phoneNumber = userDetails.phoneNumber;

  //   for (let i = 0; i < userDetails.accessLevel.length; i++) {
  //     userTypes.push(userDetails.accessLevel[i].accessLevel);
  //   }
  //   user.userTypes = userTypes;
  //   this.loggedInUser = user;
  //   this.storage.set('LoggedInUser', user);
  //   this.events.publish("user:loggedin");
  // }

  // getLoggedInUserId() {
  //   return this.loggedInUserId;
  // }

  // setLoggedInUserId(userId: string) {
  //   this.loggedInUserId = userId;
  // }

  // getUserDevicesFromLocal() {
  //   return this.userDevicesList;
  // }

  // setUserDevices(deviceList: any) {
  //   this.userDevicesList = deviceList;
  // }

  async getLoggedInUser() {
    console.log("get token");
    if (!this.loggedInUser) {
      await this.storage.ready();
      const userToken = await this.storage.get('LoggedInUser');
      this.userP2PDevices = await this.storage.get('UserP2PDevices');
      this.userP2PDetails = await this.storage.get('P2PUserDetails');
      this.loggedInUser = userToken;
      this.events.publish("user:loggedin");
      if (userToken) {
        this.loggedInUser = userToken;
      }
    }
    return this.loggedInUser;
  }

  setP2PUserDetails(p2pUserDetails) {
    let userP2Pdetails = new UserP2PDetails();
    userP2Pdetails.boardId = p2pUserDetails.boardId;
    userP2Pdetails.localityId = p2pUserDetails.localityId;
    userP2Pdetails.localityName = p2pUserDetails.localityName;
    userP2Pdetails.stateName = p2pUserDetails.stateName;
    userP2Pdetails.stateId = p2pUserDetails.stateId;
    this.storage.set('P2PUserDetails', userP2Pdetails);
    this.userP2PDetails = userP2Pdetails;
  }

  setP2PUserDevices(p2pDevices) {
    this.storage.set('UserP2PDevices', p2pDevices);
    this.userP2PDevices = p2pDevices;
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

  // async getUserDevicesToken() {
  //   console.log("get token");
  //   if (!this.userDevicesList) {
  //     console.log("storage token");
  //     await this.storage.ready();
  //     const token = await this.storage.get('UserP2PDevices');
  //     if (token) {
  //       console.log("storage token recieved");
  //       this.userDevicesList = token;
  //     }
  //   }
  //   console.log('user devices token : ', this.userDevicesList);
  //   return this.userDevicesList;
  // }

  // async printStorageKeyValue(key: any) {
  //   console.log(key, ' : ', await this.storage.get(key));
  // }

  getp2pUserProfile(userId) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(this.getP2PUserProfileUrl + '/' + userId
      , options
    );
  }

  logout(): Promise<boolean> {
    return this.storage.remove('LoggedInUser').then(() => {
      this.storage.remove('UserP2PDevices');
      this.storage.remove('P2PUserDetails');
      this.router.navigate(['/login']);
      return true;
    })
  }
}
