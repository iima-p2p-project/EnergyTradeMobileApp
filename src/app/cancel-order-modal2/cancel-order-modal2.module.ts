import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CancelOrderModal2Page } from './cancel-order-modal2.page';

const routes: Routes = [
  {
    path: '',
    component: CancelOrderModal2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CancelOrderModal2Page]
})
export class CancelOrderModal2PageModule {}
