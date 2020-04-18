import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AllDrEventSetsPage } from './all-dr-event-sets.page';

const routes: Routes = [
  {
    path: '',
    component: AllDrEventSetsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AllDrEventSetsPage]
})
export class AllDrEventSetsPageModule {}
