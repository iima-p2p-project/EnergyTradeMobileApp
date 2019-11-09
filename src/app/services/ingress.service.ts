import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { INGRESS_URL, CONFIG_URL } from 'src/app/environments/environments';
import { AllUser } from 'src/app/models/AllUser';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IngressService {

  loginUrl = INGRESS_URL + '/login';
  sendOtpUrl = INGRESS_URL + '/sendOtp';
  generateOtpUrl = INGRESS_URL + '/generateOtp';
  verifyOtpUrl = INGRESS_URL + '/verifyOtp';
  getAllStateUrl = INGRESS_URL + '/getAllState';
  getStateBoardMappingUrl = INGRESS_URL + '/getStateBoardMapping';
  registerUrl = INGRESS_URL + '/registerUser';
  addDeviceUrl = INGRESS_URL + '/addDevice';
  getUserDevicesUrl = INGRESS_URL + '/getUserDevices';

  loggedInUser: AllUser;
  loggedInUserId: string;


  userDevicesList: any;

  constructor(private httpClient: HttpClient
    ,private storage: Storage
    ,private router: Router) { }

  login(userDetails) {
    console.log("Inside Login", userDetails);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    //return { 'recordStatus' : 2 };
    return this.httpClient.post(this.loginUrl
      , userDetails
      , options
    );
  }

  async testLogin(userDetails) {
    return { 'recordStatus' : 2 };
  }

  generateOtp(phoneNumber: string) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.generateOtpUrl
      , {"phone":phoneNumber}
      , options
    );
  }

  sendOtp(phoneNumber: string) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.sendOtpUrl
      , {"phone":phoneNumber}
      , options
    );
  }

  verifyOtp(phoneNumber: string, otp: string) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.verifyOtpUrl
      , {"phone":phoneNumber,"otp":otp}
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

  register(user: any) {
    console.log('register payload : ' , user);
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
    console.log('device list : ' , deviceList);
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
    console.log('user id : ' , userId);
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

  setLoggedInUser(user: AllUser) {
    this.loggedInUser = user;
  }

  getLoggedInUserId() {
    return this.loggedInUserId;
  }

  setLoggedInUserId(userId: string) {
    this.loggedInUserId = userId;
  }

  getUserDevicesFromLocal() {
    return this.userDevicesList;
  }

  setUserDevices(deviceList: any) {
    this.userDevicesList = deviceList;
  }

  async getUserIdToken() {
    console.log("get token");
    if (!this.loggedInUser) {
      console.log("storage token");
      await this.storage.ready();
      const token = await this.storage.get('LoggedInUserId');
      if (token) {
        console.log("storage token recieved");
        this.loggedInUserId = token;
      }
    }
    console.log('user id token : ' , this.loggedInUserId);
    return this.loggedInUserId;
  }

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
    console.log('user devices token : ' , this.userDevicesList);
    return this.userDevicesList;
  }

  async printStorageKeyValue(key: any) {
    console.log(key , ' : ' , await this.storage.get(key));
  }

  logout(): Promise<boolean> {
    return this.storage.remove('LoggedInUserDevices').then(() => {
      return this.storage.remove('LoggedInUserId').then(() => {
        this.loggedInUserId = null;
        this.loggedInUser = null;
        this.userDevicesList = null;
        this.router.navigate(['/login']);
        return true;
      });
    })
  }
}
