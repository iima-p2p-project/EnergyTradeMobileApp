import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-bid-modal',
  templateUrl: './edit-bid-modal.page.html',
  styleUrls: ['./edit-bid-modal.page.scss'],
})
export class EditBidModalPage implements OnInit {

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }

  close(){
    this.modal.dismiss();
  }
}
