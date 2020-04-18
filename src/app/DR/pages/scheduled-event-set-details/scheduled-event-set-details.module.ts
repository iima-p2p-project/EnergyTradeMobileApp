import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScheduledEventSetDetailsPage } from './scheduled-event-set-details.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduledEventSetDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ScheduledEventSetDetailsPage]
})
export class ScheduledEventSetDetailsPageModule {}
