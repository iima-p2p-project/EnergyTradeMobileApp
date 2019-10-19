import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuyPostSuccessPage } from './buy-post-success.page';

const routes: Routes = [
  {
    path: '',
    component: BuyPostSuccessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BuyPostSuccessPage]
})
export class BuyPostSuccessPageModule {}
