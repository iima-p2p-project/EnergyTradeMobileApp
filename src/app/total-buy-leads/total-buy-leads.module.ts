import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TotalBuyLeadsPage } from './total-buy-leads.page';

const routes: Routes = [
  {
    path: '',
    component: TotalBuyLeadsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TotalBuyLeadsPage]
})
export class TotalBuyLeadsPageModule {}
