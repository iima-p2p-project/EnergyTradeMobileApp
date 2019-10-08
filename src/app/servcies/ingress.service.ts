import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { INGRESS_URL, CONFIG_URL } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class IngressService {

  loginUrl = INGRESS_URL + '/login';

  constructor(private httpClient: HttpClient) { }

  login(userDetails) {
    console.log("Inside Login", userDetails);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.loginUrl
      , userDetails
      , options
    );
  }
}
