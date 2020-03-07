import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService} from 'src/app/services/order.service';
import { ContractPayload } from 'src/app/models/ContractPayload';
import { BuyPostSuccessPage } from '../buy-post-success/buy-post-success.page';
import { IonDatetime, Platform, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  contractPayload: ContractPayload = {};

  selectedOption:any;

  totalAmount: number;
  ratePerUnit: number;
  startTime: string;
  endTime: string;
  energy: any;
  power: any;
  date: string;

  sellOrderId: any;
  buyerId: any;

  deviceTypeName: any;

  resFromServer: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    public modal: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.selectedOption='bank';
    this.route.queryParams.subscribe(params => {
      this.sellOrderId = params['sellOrderId'];
      this.buyerId = params['buyerId'];
      this.totalAmount = params['totalAmount'];
      this.ratePerUnit = params['ratePerUnit'];
      this.power = params['power'];
      this.energy = params['energy'];
      this.deviceTypeName = params['deviceTypeName'];
      this.startTime = params['startTime'];
      this.endTime = params['endTime'];
      this.date = params['date'];

      console.log('order details : ' , this.sellOrderId);
      console.log('order details : ' , this.buyerId);
      console.log('order details : ' , this.totalAmount);
      console.log('order details : ' , this.ratePerUnit);
      console.log('order details : ' , this.startTime);
      console.log('order details : ' , this.endTime);
      console.log('order details : ' , this.date);
    });
  }

  segmentChanged($event)
  {
    // console.log($event.detail.value);
    this.selectedOption=$event.detail.value;
  }

  createContract() {
    console.log('coronavirus');
    this.contractPayload.sellOrderId = this.sellOrderId;
    this.contractPayload.buyerId = this.buyerId;
    this.contractPayload.energy = 10;
    console.log('create contract payload : ', this.contractPayload);
    this.orderService.createContract(this.contractPayload).subscribe((res) => {
      this.resFromServer = res;
      console.log('create contract response : ', this.resFromServer);
      this.presentModal();
    });
  }
  
  async presentModal() {
    const myModal = await this.modal.create({
      component: BuyPostSuccessPage,
      cssClass: 'my-custom-modal-small-css'
    });
    return await myModal.present();
  }
}
