import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRestPage } from './view-rest.page';

const routes: Routes = [
  {
    path: '',
    component: ViewRestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRestPageRoutingModule {}
