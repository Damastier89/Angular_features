import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AllArticlesComponent } from './all-articles/all-articles.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { ArticleContentPageComponent } from './article-content-page/article-content-page.component';
import { MaterialModule } from '../shared/material.module';
import { SearchArticlesPipe } from '../shared/pipe/searchArticles.pipe';
import { TitleModule } from '../shared/components/title/title.module';
import { SharedModule } from '../shared/shared.module';
import { ArticleTagsComponent } from './article-tags/article-tags.component';

const routes: Routes = [
	{ path: '', component: AllArticlesComponent },
	{ path: 'article_page', component: ArticlePageComponent },
	{ path: 'article/:id', component: ArticleContentPageComponent },
];

@NgModule({
	declarations: [AllArticlesComponent, ArticlePageComponent, ArticleContentPageComponent, SearchArticlesPipe, ArticleTagsComponent],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		MaterialModule,
		TitleModule,
		SharedModule,
		MatPaginatorModule,
		MatTooltipModule,
	],
})
export class ArticlesModule {}
