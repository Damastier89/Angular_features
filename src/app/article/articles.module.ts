import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AllArticlesComponent } from './all-articles/all-articles.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { ArticleContentPageComponent } from './article-content-page/article-content-page.component';
import { SearchArticlesPipe } from '../shared/pipe/searchArticles.pipe';
import { TitleModule } from '../shared/components/title/title.module';
import { SharedModule } from '../shared/shared.module';
import { ArticleTagsComponent } from './article-tags/article-tags.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
	{ path: '', component: AllArticlesComponent },
	{ path: 'article_page', component: ArticlePageComponent },
	{ path: 'article/:id', component: ArticleContentPageComponent },
];

@NgModule({
	declarations: [
		AllArticlesComponent,
		ArticlePageComponent,
		ArticleContentPageComponent,
		SearchArticlesPipe,
		ArticleTagsComponent
  ],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		TitleModule,
		SharedModule,
		MatPaginatorModule,
		MatTooltipModule,
		MatProgressSpinnerModule,
		MatFormFieldModule,
		MatIconModule,
		MatSelectModule,
		MatInputModule,
		MatButtonModule,
	],
})
export class ArticlesModule {}
