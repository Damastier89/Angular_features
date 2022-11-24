import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { AuthenticationGuard } from './shared/guard/authentication.guard';
import { ErrorPageComponeent } from './shared/components/error/error-page';

// Router для компонентов, лучше обьявлять в модулях этих компонетов.
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule),
  },
  {
    path: 'main-page', 
    component: MainPageComponent, 
    canActivate: [AuthenticationGuard]},
  {
    path: 'all_articles', 
    loadChildren: () => import('./article/articles.module').then(module => module.ArticlesModule), 
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'map', 
    loadChildren: () => import('./map/map.module').then(module => module.MapModule), 
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule), 
    canActivate: [AuthenticationGuard]},
  {
    path: 'graphics', 
    loadChildren: () => import('./graphics/graphics.module').then(module => module.GraphicsModule), 
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'angular-features', 
    loadChildren: () => import('./angular-features/angular-features.module').then(module => module.AngularFeaturesModule), 
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'model3D', 
    loadChildren: () => import('./model3D/model3D.module').then(module => module.Model3DModule), 
    canActivate: [AuthenticationGuard]
  },
  { 
    path: '**', 
    component: ErrorPageComponeent
  },
  // {path: '**', redirectTo: '/error-page',  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
