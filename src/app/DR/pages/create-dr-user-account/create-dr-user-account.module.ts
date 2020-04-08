import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateDrUserAccountPage } from './create-dr-user-account.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDrUserAccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateDrUserAccountPage]
})
export class CreateDrUserAccountPageModule {}
