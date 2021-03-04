import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestOwnerPageRoutingModule } from './rest-owner-routing.module';

import { RestOwnerPage } from './rest-owner.page';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RestOwnerPageRoutingModule
  ],
  declarations: [RestOwnerPage]
})
export class RestOwnerPageModule {}
