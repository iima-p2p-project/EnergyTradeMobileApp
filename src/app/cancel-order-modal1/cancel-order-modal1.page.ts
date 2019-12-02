import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cancel-order-modal1',
  templateUrl: './cancel-order-modal1.page.html',
  styleUrls: ['./cancel-order-modal1.page.scss'],
})
export class CancelOrderModal1Page implements OnInit {

  constructor(
    public modal:ModalController
  ) { }

  ngOnInit() {
  }

  close()
  {
    this.modal.dismiss();
  }

}
