import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-sell-post-success',
  templateUrl: './sell-post-success.page.html',
  styleUrls: ['./sell-post-success.page.scss'],
})
export class SellPostSuccessPage implements OnInit {

  constructor(
    public modal:ModalController
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
  }

}
