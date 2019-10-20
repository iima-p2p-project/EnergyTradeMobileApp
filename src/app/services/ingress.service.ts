import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { INGRESS_URL, CONFIG_URL } from 'src/app/environments/environments';
import { AllUser } from 'src/app/models/AllUser';

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

  loggedInUser: AllUser;
  loggedInUserId: number;

  constructor(private httpClient: HttpClient) { }

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
    return this.httpClient.post(this.getAllStateUrl
      , options
    );
  }

  getBoardsFromSelectedState(stateId: string) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.getStateBoardMappingUrl + '/' + stateId
      , options
    );
  }

  register(user: any) {
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

  getLoggedInUser() {
    return this.loggedInUser;
  }

  setLoggedInUser(user: AllUser) {
    this.loggedInUser = user;
  }

  getLoggedInUserId() {
    return this.loggedInUserId;
  }

  setLoggedInUserId(userId: number) {
    this.loggedInUserId = userId;
  }
}
