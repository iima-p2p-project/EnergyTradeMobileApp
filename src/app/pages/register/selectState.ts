import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'modal-page',
  templateUrl: './selectState.html',
})
export class ModalPage {

  constructor(private navP : NavParams, public modalController: ModalController) {
  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}