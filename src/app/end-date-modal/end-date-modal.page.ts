import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-end-date-modal',
  templateUrl: './end-date-modal.page.html',
  styleUrls: ['./end-date-modal.page.scss'],
})
export class EndDateModalPage implements OnInit {

  constructor(
    public modal:ModalController
  ) { }

  ngOnInit() {
  }

  close(){
    this.modal.dismiss();
  }
}
