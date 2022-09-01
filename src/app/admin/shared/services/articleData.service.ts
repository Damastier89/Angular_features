import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Article } from "../interfaces/article";
import { ArticleService } from "./article.service";

@Injectable({
  providedIn: 'root'
})
export class ArticleDataService {
  private articleData$: Subject<Article[]> = new Subject<Article[]>();

  constructor(
    private readonly articleService: ArticleService,
  ) {}

  public getDataArticle(): void {
    this.articleService.getAllArticles().pipe().subscribe({
      next: (articles: Article[]) => {
        this.articleData$.next(articles);
      },
      error: (err) => {
        console.log(`Не удалось получить разделы : ${err}`);
      }
    });
  }

  public getDataArticleSubscription(): Observable<Article[]> {
    return this.articleData$.asObservable();
  }

}
