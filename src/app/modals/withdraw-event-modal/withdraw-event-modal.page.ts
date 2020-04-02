import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-withdraw-event-modal',
  templateUrl: './withdraw-event-modal.page.html',
  styleUrls: ['./withdraw-event-modal.page.scss'],
})
export class WithdrawEventModalPage implements OnInit {

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }
}
