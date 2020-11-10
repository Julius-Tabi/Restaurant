import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDishesPageRoutingModule } from './view-dishes-routing.module';

import { ViewDishesPage } from './view-dishes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDishesPageRoutingModule
  ],
  declarations: [ViewDishesPage]
})
export class ViewDishesPageModule {}
