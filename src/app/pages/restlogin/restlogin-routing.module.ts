import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestloginPage } from './restlogin.page';

const routes: Routes = [
  {
    path: '',
    component: RestloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestloginPageRoutingModule {}
