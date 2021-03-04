import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdddishPageRoutingModule } from './adddish-routing.module';

import { AdddishPage } from './adddish.page';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdddishPageRoutingModule
  ],
  declarations: [AdddishPage]
})
export class AdddishPageModule {}
