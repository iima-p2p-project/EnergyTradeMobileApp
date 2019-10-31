import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cancel-non-trade-hour',
  templateUrl: './cancel-non-trade-hour.page.html',
  styleUrls: ['./cancel-non-trade-hour.page.scss'],
})
export class CancelNonTradeHourPage implements OnInit {

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
