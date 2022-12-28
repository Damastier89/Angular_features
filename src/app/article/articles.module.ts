import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from "ngx-pagination";

import { AllArticlesComponent } from './all-articles/all-articles.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { ArticleContentPageComponent } from './article-content-page/article-content-page.component';
import { MaterialModule } from '../shared/material.module';
import { SearchArticlesPipe } from '../shared/pipe/searchArticles.pipe';
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
    MatPaginatorModule,
    MatSelectModule,
    NgxPaginationModule,
  ],

})
export class ArticlesModule { }
