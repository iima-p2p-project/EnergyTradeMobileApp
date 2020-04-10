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
        "committedPower": committedPower,
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
}
