import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-buy-post-success',
  templateUrl: './buy-post-success.page.html',
  styleUrls: ['./buy-post-success.page.scss'],
})
export class BuyPostSuccessPage implements OnInit {

  constructor(public modal:ModalController,
    public nav:NavController) { }

  ngOnInit() {
  }

  close()
  {
    this.modal.dismiss();
  }

  manageOrders()
  {
    this.close();
    this.nav.navigateForward('manage-orders');
  }
}
