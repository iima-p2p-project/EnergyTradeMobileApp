import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AllState } from 'src/app/models/AllState';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'locality-modal-page',
  templateUrl: './selectLocality.html',
})
export class LocalityModalPage {

  localityList: any;

  selectedLocality: string;

  constructor(private navP : NavParams 
    , public modalController: ModalController
    , private stateService: StateService) {
  }

  ionViewDidEnter() {
    this.localityList = this.stateService.getStateList();
    console.log(this.localityList);
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