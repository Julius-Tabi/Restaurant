import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrowseMenuPageRoutingModule } from './browse-menu-routing.module';

import { BrowseMenuPage } from './browse-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowseMenuPageRoutingModule
  ],
  declarations: [BrowseMenuPage]
})
export class BrowseMenuPageModule {}
