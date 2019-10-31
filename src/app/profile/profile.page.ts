import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CancelInProfilePage } from '../cancel-in-profile/cancel-in-profile.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  selectedOption='upcoming';

  constructor(
    public modal:ModalController
  ) { }

  ngOnInit() {
  }

  segmentChanged($event)
  {
    // console.log($event.detail.value);
    this.selectedOption=$event.detail.value;
  }

  async openCancelModal()
  {
    let pqr=await this.modal.create({
      component:CancelInProfilePage,
      cssClass:'cancelx-custom-modal-css'
    })

    return await pqr.present();
  }

}
