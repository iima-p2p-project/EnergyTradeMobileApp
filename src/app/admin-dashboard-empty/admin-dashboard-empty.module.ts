import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminDashboardEmptyPage } from './admin-dashboard-empty.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardEmptyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminDashboardEmptyPage]
})
export class AdminDashboardEmptyPageModule {}
