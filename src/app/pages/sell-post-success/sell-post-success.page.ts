import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-sell-post-success',
  templateUrl: './sell-post-success.page.html',
  styleUrls: ['./sell-post-success.page.scss'],
})
export class SellPostSuccessPage implements OnInit {

  constructor(
    public modal:ModalController,
    public nav:NavController
  ) { }

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
