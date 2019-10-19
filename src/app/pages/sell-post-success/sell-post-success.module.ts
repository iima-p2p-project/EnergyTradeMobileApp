import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SellPostSuccessPage } from './sell-post-success.page';

const routes: Routes = [
  {
    path: '',
    component: SellPostSuccessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SellPostSuccessPage]
})
export class SellPostSuccessPageModule {}
