import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-invalid-input-modal',
  templateUrl: './invalid-input-modal.page.html',
  styleUrls: ['./invalid-input-modal.page.scss'],
})
export class InvalidInputModalPage implements OnInit {

  @Input() errorDescription: any;

  constructor(public modal:ModalController
    , public navParams: NavParams) { 
      this.errorDescription = navParams.get('errorDescription');
  }

  ngOnInit() {
  }

  close(){
    this.modal.dismiss();
  }
}
