import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardEmptyPage } from './dashboard-empty.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardEmptyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardEmptyPage]
})
export class DashboardEmptyPageModule {}
