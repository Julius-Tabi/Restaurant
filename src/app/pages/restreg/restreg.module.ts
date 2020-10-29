import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestregPageRoutingModule } from './restreg-routing.module';

import { RestregPage } from './restreg.page';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RestregPageRoutingModule
  ],
  declarations: [RestregPage]
})
export class RestregPageModule {}
