import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WithdrawEventModalPage } from './withdraw-event-modal.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawEventModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WithdrawEventModalPage]
})
export class WithdrawEventModalPageModule {}
