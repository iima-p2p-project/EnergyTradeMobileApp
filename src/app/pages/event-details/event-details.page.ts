import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditEventModalPage } from 'src/app/modals/edit-event-modal/edit-event-modal.page';
import { WithdrawEventModalPage } from 'src/app/modals/withdraw-event-modal/withdraw-event-modal.page';
import { EditBidModalPage } from 'src/app/modals/edit-bid-modal/edit-bid-modal.page';
import { DeleteModalPage } from 'src/app/modals/delete-modal/delete-modal.page';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }



  async editEvent() {
    let defg = await this.modal.create({
      component: EditEventModalPage,
      cssClass: 'edit-event-modal-css',
      componentProps: {
      }
    });
    return await defg.present();
  }


  async withdrawEvent() {
    let defg = await this.modal.create({
      component: WithdrawEventModalPage,
      cssClass: 'withdraw-event-modal-css',
      componentProps: {
      }
    });
    return await defg.present();
  }

  async editBid() {
    let defg = await this.modal.create({
      component: EditBidModalPage,
      cssClass: 'edit-bid-modal-css',
      componentProps: {
      }
    });
    return await defg.present();
  }

  async deletePumps() {
    let defg = await this.modal.create({
      component: DeleteModalPage,
      cssClass: 'delete-modal-css',
      componentProps: {
        assetName: '123'
      }
    });
    return await defg.present();
  }

}
