import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent implements OnInit {

  @Output() sellFlow = new EventEmitter();

  power: string;
  deviceName: string;

  constructor() { }

  ngOnInit() {}

  initiateSellFlow() {
    this.emitSellFlowDetailsToParent(this.deviceName, this.power);
  }

  emitSellFlowDetailsToParent(deviceName: string, power: string) {
    this.sellFlow.emit({ "deviceName": deviceName, "power": power});
  }
}
