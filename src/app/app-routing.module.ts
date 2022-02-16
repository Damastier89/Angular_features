import { AdminLayoutComponent } from './admin/shared/admin-layout/admin-layout.component';
import { AllArticlesComponent } from './all-articles/all-articles.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePageComponent } from './article-page/article-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'all_articles', component: AllArticlesComponent },
  { path: 'article_page', component: ArticlePageComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
