import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DRCustomerService } from 'src/app/services/drcustomer.service';

@Component({
  selector: 'app-withdraw-event-modal',
  templateUrl: './withdraw-event-modal.page.html',
  styleUrls: ['./withdraw-event-modal.page.scss'],
})
export class WithdrawEventModalPage implements OnInit {

  constructor(public modal: ModalController
    , private drCustomerService: DRCustomerService) { }

  @Input() params;

  ngOnInit() {
  }
  ionViewWillEnter() {

  }
  withdrawFromEvent() {

    this.drCustomerService.withdrawFromEvent(this.params.eventId, this.params.userId).subscribe((res: any) => {
      if (res.response.message != "Success")
        console.log("Something went wrong in withdraw event");
      else
        this.modal.dismiss();
    })


  }

  close() {
    this.modal.dismiss();
  }
}
