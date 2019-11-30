import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForecastEmptyPage } from './forecast-empty.page';

const routes: Routes = [
  {
    path: '',
    component: ForecastEmptyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForecastEmptyPage]
})
export class ForecastEmptyPageModule {}
