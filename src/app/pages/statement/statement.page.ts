import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.page.html',
  styleUrls: ['./statement.page.scss'],
})
export class StatementPage implements OnInit {

  fromDate: any = new Date().toISOString();
  toDate: any = new Date().toISOString();

  constructor() { }

  ngOnInit() {
  }

}
