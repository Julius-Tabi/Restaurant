import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRestPageRoutingModule } from './view-rest-routing.module';

import { ViewRestPage } from './view-rest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRestPageRoutingModule
  ],
  declarations: [ViewRestPage]
})
export class ViewRestPageModule {}
