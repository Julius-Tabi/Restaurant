import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'user-reg',
    loadChildren: () => import('./pages/user-reg/user-reg.module').then( m => m.UserRegPageModule)
  },
  {
    path: 'restaurant-list',
    loadChildren: () => import('./pages/restaurant-list/restaurant-list.module').then( m => m.RestaurantListPageModule)
  },
  {
    path: 'restreg',
    loadChildren: () => import('./pages/restreg/restreg.module').then( m => m.RestregPageModule)
  },
  {
    path: 'restlogin',
    loadChildren: () => import('./pages/restlogin/restlogin.module').then( m => m.RestloginPageModule)
  },
  {
    path: 'rest-home',
    loadChildren: () => import('./pages/rest-home/rest-home.module').then( m => m.RestHomePageModule)
  },
  {
    path: 'adddish',
    loadChildren: () => import('./pages/adddish/adddish.module').then( m => m.AdddishPageModule)
  },
  {
    path: 'rest-owner',
    loadChildren: () => import('./pages/rest-owner/rest-owner.module').then( m => m.RestOwnerPageModule)
  },
  {
    path: 'rest-profile',
    loadChildren: () => import('./pages/rest-profile/rest-profile.module').then( m => m.RestProfilePageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/service/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'view-rest/:id',
    loadChildren: () => import('./pages/view-rest/view-rest.module').then( m => m.ViewRestPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
