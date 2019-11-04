import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalEditPage } from '../modal-edit/modal-edit.page';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.page.html',
  styleUrls: ['./admin-edit.page.scss'],
})
export class AdminEditPage implements OnInit {

  constructor(
    public modal:ModalController
  ) { }

  ngOnInit() {
  }

  async openEditModal()
  {
    let pqr=await this.modal.create({
      component:ModalEditPage,
      cssClass:"cancel-custom-modal-css"
    })

    return await pqr.present();
  }

}
