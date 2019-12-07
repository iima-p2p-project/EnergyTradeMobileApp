import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InvalidInputModalPage } from './invalid-input-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InvalidInputModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InvalidInputModalPage]
})
export class InvalidInputModalPageModule {}
