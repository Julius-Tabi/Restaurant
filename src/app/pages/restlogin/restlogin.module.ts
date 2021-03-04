import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestloginPageRoutingModule } from './restlogin-routing.module';

import { RestloginPage } from './restlogin.page';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RestloginPageRoutingModule
  ],
  declarations: [RestloginPage]
})
export class RestloginPageModule {}
