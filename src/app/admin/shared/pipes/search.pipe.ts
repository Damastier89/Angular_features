import { ArticleInterface } from '../interfaces/article.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(articles: ArticleInterface[], title: ''): any {
    if (!title.trim()) {
      return articles;
    }

    return articles.filter((article: ArticleInterface) => {
      return article.title.toLowerCase().includes(title.toLowerCase());
    });
  }
}
