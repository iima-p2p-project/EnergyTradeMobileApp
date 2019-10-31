import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CancelNonTradeHourPage } from './cancel-non-trade-hour.page';

const routes: Routes = [
  {
    path: '',
    component: CancelNonTradeHourPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CancelNonTradeHourPage]
})
export class CancelNonTradeHourPageModule {}
