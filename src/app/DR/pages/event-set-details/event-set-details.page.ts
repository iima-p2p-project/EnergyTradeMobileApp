import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WithdrawEventModalPage } from 'src/app/modals/withdraw-event-modal/withdraw-event-modal.page';
import { EditBidModalPage } from 'src/app/modals/edit-bid-modal/edit-bid-modal.page';
import { DeleteModalPage } from 'src/app/modals/delete-modal/delete-modal.page';
import { EditEventModalPage } from 'src/app/modals/edit-event-modal/edit-event-modal.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-set-details',
  templateUrl: './event-set-details.page.html',
  styleUrls: ['./event-set-details.page.scss'],
})
export class EventSetDetailsPage implements OnInit {

  constructor(public modal: ModalController, private router: Router) { }

  ngOnInit() {
  }



  async editEvent() {
    let editEventModal = await this.modal.create({
      component: EditEventModalPage,
      cssClass: 'edit-event-modal-css',
      componentProps: {
      }
    });
    return await editEventModal.present();
  }


  async withdrawEvent() {
    let withdrawEventModal = await this.modal.create({
      component: WithdrawEventModalPage,
      cssClass: 'withdraw-event-modal-css',
      componentProps: {
      }
    });
    return await withdrawEventModal.present();
  }

  async editBid() {
    let editEventModal = await this.modal.create({
      component: EditBidModalPage,
      cssClass: 'edit-bid-modal-css',
      componentProps: {
      }
    });
    return await editEventModal.present();
  }

  async deletePumps() {
    let deletePumpsModal = await this.modal.create({
      component: DeleteModalPage,
      cssClass: 'delete-modal-css',
      componentProps: {
        assetName: '123'
      }
    });
    return await deletePumpsModal.present();
  }

  showNotifications() {
    this.router.navigateByUrl('/notifications');
  }
}
