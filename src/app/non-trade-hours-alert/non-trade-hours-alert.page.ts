import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-non-trade-hours-alert',
  templateUrl: './non-trade-hours-alert.page.html',
  styleUrls: ['./non-trade-hours-alert.page.scss'],
})
export class NonTradeHoursAlertPage implements OnInit {

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
