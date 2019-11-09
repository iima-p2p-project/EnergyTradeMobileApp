import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AllState } from 'src/app/models/AllState';
import { StateService } from 'src/app/services/state.service';
import { LocalityService } from 'src/app/services/locality.service';
import { IngressService } from 'src/app/services/ingress.service';

@Component({
  selector: 'locality-modal-page',
  templateUrl: './selectLocality.html',
})
export class LocalityModalPage {

  localityList: any;
  resFromService: any;
  selectedLocality: string;

  @Input() stateId: any;

  constructor(private navP : NavParams 
    , public modalController: ModalController
    , private stateService: StateService
    , private localityService: LocalityService
    , private ingressService: IngressService) {
  }

  ionViewDidEnter() {
    console.log('state id from previous page : ' , this.stateId);
    this.ingressService.getLocalityFromSelectedState(this.stateId).subscribe((res) => {
      this.resFromService = res;
      console.log('list of localities from server : ' , this.resFromService);
      this.localityList = this.resFromService.response;
    });
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  selectLocality(locality: any) {
    this.modalController.dismiss({
      'dismissed': true,
      'selectedLocalityId': locality.localityId,
      'selectedLocalityName': locality.localityName
    });
  }
}