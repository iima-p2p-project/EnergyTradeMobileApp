import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-delete-pumps-modal',
  templateUrl: './delete-pumps-modal.page.html',
  styleUrls: ['./delete-pumps-modal.page.scss'],
})
export class DeletePumpsModalPage implements OnInit {

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }

  close(){
    this.modal.dismiss();
  }
}
