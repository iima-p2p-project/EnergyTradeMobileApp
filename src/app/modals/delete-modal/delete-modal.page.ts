import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.page.html',
  styleUrls: ['./delete-modal.page.scss'],
})
export class DeleteModalPage implements OnInit {

  assetName = '';
  constructor(public modal: ModalController, public navParams: NavParams) { }

  ngOnInit() {
    this.assetName = this.navParams.get('assetName');
  }

  close() {
    this.modal.dismiss();
  }
}
