import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-cancel-non-trade-hour',
  templateUrl: './cancel-non-trade-hour.page.html',
  styleUrls: ['./cancel-non-trade-hour.page.scss'],
})
export class CancelNonTradeHourPage implements OnInit {

  @Input() nonTradeHourId: any;

  constructor(public navParams: NavParams
    , public modal:ModalController
    , public adminService: AdminService) {
      this.nonTradeHourId = navParams.get('nonTradeHourId'); 
    }

  ngOnInit() {
  }

  close(){
    this.modal.dismiss();
  }

  noAction() {
    this.close();
  }

  yesAction() {
    this.adminService.cancelNonTradeHour({status: "CANCEL"} , this.nonTradeHourId).subscribe((res) => {
      console.log('response from cancel non trade hour service : ' , res);
      this.close();
    })
  }
}
