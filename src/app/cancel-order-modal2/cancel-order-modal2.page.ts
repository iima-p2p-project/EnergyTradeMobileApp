import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cancel-order-modal2',
  templateUrl: './cancel-order-modal2.page.html',
  styleUrls: ['./cancel-order-modal2.page.scss'],
})
export class CancelOrderModal2Page implements OnInit {

  constructor(
    public modal:ModalController
  ) { }

  ngOnInit() {
  }

  close()
  {
    this.modal.dismiss();
  }

  yesAction()
  {

  }

  noAction()
  {
    
  }

}
