import { Injectable } from '@angular/core';
import { DR_URL } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DRCustomerService {

  getBusinessContractDetailsUrl = DR_URL + '/getBusinessContractDetails';
  updateDrCustomerDetailsUrl = DR_URL + '/updateDrCustomerDetails';

  getEventSetsForCustomerUrl = DR_URL + '/getEventSetsForCustomer';
  getEventsForCustomerAndEventSetUrl = DR_URL + '/getEventsForCustomerAndEventSet';
  participateInEventUrl = DR_URL + '/participateInEvent';
  withdrawFromEventUrl = DR_URL + '/withdrawFromEvent';
  counterbidInEventUrl = DR_URL + '/counterbidInEvent';
  updateEventCommitmentsUrl = DR_URL + '/updateEventCommitments';
  getDRCustomerProfileUrl = DR_URL + '/getDRCustomerProfile';
  addDRDeviceUrl = DR_URL + '/addDRCustomerDevice';
  updateDRDeviceUrl = DR_URL + '/updateDRCustomerDevice';
  deleteDRDeviceUrl = DR_URL + '/deleteDRCustomerDevice';
  fetchEventCountsUrl = DR_URL + '/fetchEventCounts';

  totalEarnings = 0;
  totalPenalty = 0;


  constructor(private httpClient: HttpClient) { }

  getContractDetails(contractNumber: any) {
    console.log('get business contract details for contract id : ', contractNumber);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(this.getBusinessContractDetailsUrl + '/' + contractNumber
      , options
    );
  }

  updateDrCustomerDetails(fullName: string, phone: string, drContractNumber: string) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.updateDrCustomerDetailsUrl
      , { "fullName": "" + fullName, "phoneNumber": "" + phone, "drContractNumber": "" + drContractNumber }
      , options
    );
  }


  getEventSetsForCustomer(customerId: any) {
    console.log('get event sets details for customerId id : ', customerId);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(this.getEventSetsForCustomerUrl + '/' + customerId
      , options
    );
  }

  getEventsForCustomerAndEventSet(eventSetId: any, customerId: any) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.getEventsForCustomerAndEventSetUrl
      , { "eventSetId": +eventSetId, "customerId": +customerId }
      , options
    );
  }

  participateInEvent(eventId, userId, committedPower, devices) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.participateInEventUrl
      , {
        "userId": +userId,
        "eventId": +eventId,
        "committedPower": "" + committedPower,
        "devices": devices
      }
      , options
    );
  }

  withdrawFromEvent(eventId, userId) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.withdrawFromEventUrl
      , {
        "userId": +userId,
        "eventId": +eventId
      }
      , options
    );
  }

  counterBidToEvent(eventId, userId, committedPower, counterBidAmount, devices) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.counterbidInEventUrl
      , {
        "userId": userId,
        "eventId": eventId,
        "committedPower": "" + committedPower,
        "counterBidAmount": "" + counterBidAmount,
        "devices": devices
      }
      , options
    );
  }

  updateEventCommitments(eventId, userId, updatedCommitedPower, updatedCounterBidAmount, devices) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.updateEventCommitmentsUrl
      , {
        "userId": userId,
        "eventId": eventId,
        "updatedCommitedPower": "" + updatedCommitedPower,
        "updatedCounterBidAmount": "" + updatedCounterBidAmount,
        "updatedDeviceList": devices
      }
      , options
    );
  }


  getDRCustomerProfile(userId) {

    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.getDRCustomerProfileUrl
      , {
        "userId": +userId,
      }
      , options
    );

  }


  addDRDevice(userId: any, deviceName: String, deviceCapacity: String) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.addDRDeviceUrl
      , {
        userId,
        deviceDetails: [{
          deviceName,
          deviceCapacity
        }]
      }
      , options
    );
  }

  editDRDevice(userDeviceId: any, deviceName: String, deviceCapacity: String) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.updateDRDeviceUrl
      , {
        "userDrDeviceId": +userDeviceId,
        "deviceName": deviceName,
        "deviceCapacity": deviceCapacity
      }
      , options
    );
  }

  deleteDRDevice(userDeviceId: any) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.delete(this.deleteDRDeviceUrl + "/" + userDeviceId
      , options
    );
  }


  fetchEventCounts(userId: any) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(this.fetchEventCountsUrl + "/" + userId
      , options
    );
  }


}
