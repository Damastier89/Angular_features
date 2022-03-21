import { Article } from '../interfaces/article';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(articles: Article[], title: ''): any {
    if (!title.trim()) {
      return articles;
    }

    return articles.filter((article: Article) => {
      return article.title.toLowerCase().includes(title.toLowerCase());
    })
  }
}