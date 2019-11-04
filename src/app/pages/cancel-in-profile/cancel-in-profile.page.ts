import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cancel-in-profile',
  templateUrl: './cancel-in-profile.page.html',
  styleUrls: ['./cancel-in-profile.page.scss'],
})
export class CancelInProfilePage implements OnInit {

  selection:any;

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
