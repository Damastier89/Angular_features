import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'all_articles', loadChildren: () => import('./article/articles.module').then(module => module.ArticlesModule)},
  {path: 'map', loadChildren: () => import('./map/map.module').then(module => module.MapModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)},
  {path: 'graphics', loadChildren: () => import('./graphics/graphics.module').then(module => module.GraphicsModule)},
  {path: 'angular-features', loadChildren: () => import('./angular-features/angular-features.module').then(module => module.AngularFeaturesModule)},
  {path: 'model3D', loadChildren: () => import('./model3D/model3D.module').then(module => module.Model3DModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
