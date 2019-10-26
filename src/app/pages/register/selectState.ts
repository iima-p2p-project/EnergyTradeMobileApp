import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AllState } from 'src/app/models/AllState';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'state-modal-page',
  templateUrl: './selectState.html',
})
export class StateModalPage {

  stateList: any;

  selectedState: string;

  constructor(private navP : NavParams 
    , public modalController: ModalController
    , private stateService: StateService) {
  }

  ionViewDidEnter() {
    this.stateList = this.stateService.getStateList();
    console.log(this.stateList);
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