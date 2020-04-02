import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-event-modal',
  templateUrl: './edit-event-modal.page.html',
  styleUrls: ['./edit-event-modal.page.scss'],
})
export class EditEventModalPage implements OnInit {

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }

  close(){
    this.modal.dismiss();
  }
}
