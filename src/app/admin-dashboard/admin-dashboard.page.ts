import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { CancelNonTradeHourPage } from '../cancel-non-trade-hour/cancel-non-trade-hour.page';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  constructor(
    public modal:ModalController,
    public nav:NavController
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
