import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NonTradePostSuccessPage } from './non-trade-post-success.page';

const routes: Routes = [
  {
    path: '',
    component: NonTradePostSuccessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NonTradePostSuccessPage]
})
export class NonTradePostSuccessPageModule {}
