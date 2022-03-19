import { Article } from './../shared/interfaces/article';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/services/article.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-article',
  templateUrl: './dashboard-article.component.html',
  styleUrls: ['./dashboard-article.component.scss']
})
export class DashboardArticleComponent implements OnInit {
  public articles: Article[] = [];
  public articleSubscription!: Subscription;
  public searchArticleName: any = '';

  constructor( private articleService: ArticleService ) { }

  ngOnInit(): void {
    this.articleSubscription = this.articleService.getAllArticles().subscribe( article => this.articles = article);
  }

  public removeArticle(id: any): void {
    this.articleService.removeArticle(id).subscribe(() => {
      this.articles = this.articles.filter(article => article.id !== id);
    })
  }



}
