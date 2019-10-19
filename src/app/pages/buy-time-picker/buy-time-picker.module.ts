import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuyTimePickerPage } from './buy-time-picker.page';

const routes: Routes = [
  {
    path: '',
    component: BuyTimePickerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BuyTimePickerPage]
})
export class BuyTimePickerPageModule {}
