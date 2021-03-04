import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserReservationPageRoutingModule } from './user-reservation-routing.module';

import { UserReservationPage } from './user-reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserReservationPageRoutingModule
  ],
  declarations: [UserReservationPage]
})
export class UserReservationPageModule {}
