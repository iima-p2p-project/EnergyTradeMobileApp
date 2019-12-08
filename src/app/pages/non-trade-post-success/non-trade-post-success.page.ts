import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-non-trade-post-success',
  templateUrl: './non-trade-post-success.page.html',
  styleUrls: ['./non-trade-post-success.page.scss'],
})
export class NonTradePostSuccessPage implements OnInit {

  constructor(public modal:ModalController,
    public nav:NavController) { }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }

  adminDashboard() {
    this.close();
    this.nav.navigateForward('admin-dashboard');
  }
}
