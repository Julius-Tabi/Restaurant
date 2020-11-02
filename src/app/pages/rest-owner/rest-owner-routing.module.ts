import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestOwnerPage } from './rest-owner.page';

const routes: Routes = [
  {
    path: '',
    component: RestOwnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestOwnerPageRoutingModule {}
