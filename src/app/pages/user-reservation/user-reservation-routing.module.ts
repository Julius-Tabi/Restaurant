import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserReservationPage } from './user-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: UserReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserReservationPageRoutingModule {}
