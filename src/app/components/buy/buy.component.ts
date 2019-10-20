import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
})
export class BuyComponent implements OnInit {

  @Output() buyFlow = new EventEmitter();

  power: string;
  deviceName: string;

  constructor() { }

  ngOnInit() {}

  initiateBuyFlow() {
    this.emitBuyFlowDetailsToParent(this.deviceName, this.power);
  }

  emitBuyFlowDetailsToParent(deviceName: string, power: string) {
    this.buyFlow.emit({ "deviceName": deviceName, "power": power});
  }

}
