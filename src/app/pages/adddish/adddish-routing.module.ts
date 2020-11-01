import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdddishPage } from './adddish.page';

const routes: Routes = [
  {
    path: '',
    component: AdddishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdddishPageRoutingModule {}
