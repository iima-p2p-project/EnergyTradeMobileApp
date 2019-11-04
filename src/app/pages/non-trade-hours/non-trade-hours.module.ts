import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NonTradeHoursPage } from './non-trade-hours.page';

const routes: Routes = [
  {
    path: '',
    component: NonTradeHoursPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NonTradeHoursPage]
})
export class NonTradeHoursPageModule {}
