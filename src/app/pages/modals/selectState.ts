import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AllState } from 'src/app/models/AllState';
import { StateService } from 'src/app/services/state.service';
import { IngressService } from 'src/app/services/ingress.service';

@Component({
  selector: 'state-modal-page',
  templateUrl: './selectState.html',
})
export class StateModalPage {

  stateList: any;
  selectedState: string;
  resFromService: any;

  constructor(private navP : NavParams 
    , public modalController: ModalController
    , private stateService: StateService
    , private ingressService: IngressService) {
  }

  ionViewDidEnter() {
    this.ingressService.getAllStates().subscribe((res => {
      this.resFromService = res;
      console.log('list of states from server : ' , this.resFromService);
      this.stateList = this.resFromService.response;
    }));
    
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  selectState(state: any) {
    this.modalController.dismiss({
      'dismissed': true,
      'selectedStateId': state.stateId,
      'selectedStateName': state.stateName
    });
  }
}