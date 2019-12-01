import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EndDateModalPage } from '../end-date-modal/end-date-modal.page';
import { InvalidInputModalPage } from '../invalid-input-modal/invalid-input-modal.page';
import { Error404ModalPage } from '../error404-modal/error404-modal.page';
import { NonTradeHoursAlertPage } from '../non-trade-hours-alert/non-trade-hours-alert.page';

@Component({
  selector: 'app-alert-test',
  templateUrl: './alert-test.page.html',
  styleUrls: ['./alert-test.page.scss'],
})
export class AlertTestPage implements OnInit {

  constructor(
    public modal:ModalController
  ) { }

  ngOnInit() {
  }


  async endDateModal() 
  {
    let defg = await this.modal.create({
      component: EndDateModalPage,
      cssClass: 'end-date-modal-css'
    })
    return await defg.present();
  }

  async invalidInputModal()
  {
    let defg = await this.modal.create({
      component: InvalidInputModalPage,
      cssClass: 'invalid-input-modal-css'
    })
    return await defg.present();
  }

  async error404Modal()
  {
    let defg = await this.modal.create({
      component: Error404ModalPage,
      cssClass: 'error404-input-modal-css'
    })
    return await defg.present();
  }

  async noneTradeModal()
  {
    let defg = await this.modal.create({
      component: NonTradeHoursAlertPage,
      cssClass: 'none-trade-alert-modal-css'
    })
    return await defg.present();
  }


}
