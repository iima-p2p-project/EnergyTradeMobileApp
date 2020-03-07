import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeletePumpsModalPage } from './delete-pumps-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DeletePumpsModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeletePumpsModalPage]
})
export class DeletePumpsModalPageModule {}
