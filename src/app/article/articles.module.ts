import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllArticlesComponent } from './all-articles/all-articles.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { ArticleContentPageComponent } from './article-content-page/article-content-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { SearchArticlesPipe } from '../shared/pipe/searchArticles.pipe';
import { FormsModule } from '@angular/forms';
import { TitleModule } from '../shared/components/title/title.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AllArticlesComponent,
    ArticlePageComponent,
    ArticleContentPageComponent,
    SearchArticlesPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
        { path: '', component: AllArticlesComponent },
        { path: 'article_page', component: ArticlePageComponent },
        { path: 'article/:id', component: ArticleContentPageComponent },
    ]),
    MaterialModule,
    TitleModule,
    SharedModule,
  ],

})
export class ArticlesModule { }
