import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../../admin/shared/interfaces/article';

@Pipe({
  name: 'searchArticles'
})
export class SearchArticlesPipe implements PipeTransform {
  transform(articles: Article[], articleName: ''): any {
    if (!articleName.trim()) {
      return articles;
    }
    return articles.filter((article: Article) => {
      return article.title.toLowerCase().includes(articleName.toLowerCase());
    });
  }
}
