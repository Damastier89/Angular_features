import { MapComponent } from './map/map.component';
import { AllArticlesComponent } from './article/all-articles/all-articles.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePageComponent } from './article/article-page/article-page.component';
import { ArticleContentPageComponent } from './article/article-content-page/article-content-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'all_articles', component: AllArticlesComponent },
  { path: 'article_page', component: ArticlePageComponent },
  { path: 'article/:id', component: ArticleContentPageComponent },
  { path: 'map', component: MapComponent},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
