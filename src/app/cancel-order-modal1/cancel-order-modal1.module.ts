import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CancelOrderModal1Page } from './cancel-order-modal1.page';

const routes: Routes = [
  {
    path: '',
    component: CancelOrderModal1Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CancelOrderModal1Page]
})
export class CancelOrderModal1PageModule {}
