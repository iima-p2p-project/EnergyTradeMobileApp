import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DRUserProfilePage } from './druser-profile.page';

const routes: Routes = [
  {
    path: '',
    component: DRUserProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DRUserProfilePage]
})
export class DRUserProfilePageModule {}
