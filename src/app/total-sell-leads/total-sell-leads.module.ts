import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TotalSellLeadsPage } from './total-sell-leads.page';

const routes: Routes = [
  {
    path: '',
    component: TotalSellLeadsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TotalSellLeadsPage]
})
export class TotalSellLeadsPageModule {}
