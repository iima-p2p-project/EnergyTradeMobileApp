import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NonTradeHoursAlertPage } from './non-trade-hours-alert.page';

const routes: Routes = [
  {
    path: '',
    component: NonTradeHoursAlertPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NonTradeHoursAlertPage]
})
export class NonTradeHoursAlertPageModule {}
