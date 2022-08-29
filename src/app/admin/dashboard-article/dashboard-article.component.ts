import { Article } from './../shared/interfaces/article';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../shared/services/article.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-article',
  templateUrl: './dashboard-article.component.html',
  styleUrls: ['./dashboard-article.component.scss']
})
export class DashboardArticleComponent implements OnInit, OnDestroy {
  public articles: Article[] = [];
  public searchArticleName: any = '';

  private destroyNotifier: Subject<boolean> = new Subject<boolean>();

  constructor( private articleService: ArticleService ) { }

  ngOnInit(): void {
    this.articleService.getAllArticles().pipe(
      takeUntil(this.destroyNotifier)
    ).subscribe(article => this.articles = article);
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next(true);
    this.destroyNotifier.complete();
  }

  public removeArticle(id: any): void {
    this.articleService.removeArticle(id).pipe(
      takeUntil(this.destroyNotifier)
    ).subscribe(() => {
      this.articles = this.articles.filter(article => article.id !== id);
    })
  }



}
