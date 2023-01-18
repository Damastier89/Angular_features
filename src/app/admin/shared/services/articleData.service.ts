import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ArticleInterface } from '../interfaces/article.interface';
import { ArticleService } from './article.service';

@Injectable({
	providedIn: 'root',
})
export class ArticleDataService {
	private articleData$: Subject<ArticleInterface[]> = new Subject<ArticleInterface[]>();

	constructor(private readonly articleService: ArticleService) {}

	public getDataArticle(): void {
		this.articleService
			.getAllArticles()
			.pipe()
			.subscribe({
				next: (articles: ArticleInterface[]) => {
					this.articleData$.next(articles);
				},
				error: (err) => {
					console.log(`Не удалось получить разделы : ${err}`);
				},
			});
	}

	public getDataArticleSubscription(): Observable<ArticleInterface[]> {
		return this.articleData$.asObservable();
	}
}
