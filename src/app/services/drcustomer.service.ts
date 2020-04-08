import { Injectable } from '@angular/core';
import { DR_URL } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DRCustomerService {

  getBusinessContractDetailsUrl = DR_URL + '/getBusinessContractDetails';
  updateDrCustomerDetailsUrl = DR_URL + '/updateDrCustomerDetails';

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
}
