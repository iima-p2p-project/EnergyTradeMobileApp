import { Component, OnInit } from '@angular/core';
import { CancelNonTradeHourPage } from '../cancel-non-trade-hour/cancel-non-trade-hour.page';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-non-trade-hours',
  templateUrl: './non-trade-hours.page.html',
  styleUrls: ['./non-trade-hours.page.scss'],
})
export class NonTradeHoursPage implements OnInit {

  constructor(
    public modal:ModalController
  ) { }

  ngOnInit() {
  }

  async cancelModal()
  {
    let defg= await this.modal.create({
      component:CancelNonTradeHourPage,
      cssClass: 'cancel-custom-modal-css'
    })

    return await defg.present();

  }


}
