import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-end-date-modal',
  templateUrl: './end-date-modal.page.html',
  styleUrls: ['./end-date-modal.page.scss'],
})
export class EndDateModalPage implements OnInit {

  @Input() errorMessage: any;

  constructor(
    public navParams: NavParams,
    public modal:ModalController
  ) { 
    this.errorMessage = navParams.get('errorMessage');
  }

  ngOnInit() {
  }

  close(){
    this.modal.dismiss();
  }
}
