import { ArticleService } from '../admin/shared/services/article.service';
import { Observable, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Article } from '../admin/shared/interfaces/article';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-article-content-page',
  templateUrl: './article-content-page.component.html',
  styleUrls: ['./article-content-page.component.scss']
})
export class ArticleContentPageComponent implements OnInit {
  public articles$!: Observable<Article>;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.articles$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.articleService.getArticleById(params['id']);
      })
    )
  }

}
