import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UserRegPageRoutingModule } from './user-reg-routing.module';

import { UserRegPage } from './user-reg.page';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UserRegPageRoutingModule
  ],
  declarations: [UserRegPage]
})
export class UserRegPageModule {}
