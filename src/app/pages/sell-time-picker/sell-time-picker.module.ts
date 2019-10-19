import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SellTimePickerPage } from './sell-time-picker.page';

const routes: Routes = [
  {
    path: '',
    component: SellTimePickerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SellTimePickerPage]
})
export class SellTimePickerPageModule {}
