import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationsEmptyPage } from './notifications-empty.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationsEmptyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotificationsEmptyPage]
})
export class NotificationsEmptyPageModule {}
