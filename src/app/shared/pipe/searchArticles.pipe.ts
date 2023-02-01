import { Pipe, PipeTransform } from '@angular/core';
import { ArticleInterface } from '../../article/interfaces/article.interface';

@Pipe({
	name: 'searchArticles',
})
export class SearchArticlesPipe implements PipeTransform {
	transform(articles: ArticleInterface[], articleName: ''): any {
		if (!articleName.trim()) {
			return articles;
		}
		return articles.filter((article: ArticleInterface) => {
			return article.title.toLowerCase().includes(articleName.toLowerCase());
		});
	}
}
