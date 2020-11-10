import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDishesPage } from './view-dishes.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDishesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDishesPageRoutingModule {}
