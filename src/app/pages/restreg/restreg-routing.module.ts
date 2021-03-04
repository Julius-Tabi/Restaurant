import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestregPage } from './restreg.page';

const routes: Routes = [
  {
    path: '',
    component: RestregPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestregPageRoutingModule {}
