import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManageOrdersEmptyPage } from './manage-orders-empty.page';

const routes: Routes = [
  {
    path: '',
    component: ManageOrdersEmptyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageOrdersEmptyPage]
})
export class ManageOrdersEmptyPageModule {}
