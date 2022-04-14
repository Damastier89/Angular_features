import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Article } from '../../admin/shared/interfaces/article';
import { ArticleService } from '../../admin/shared/services/article.service';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss']
})
export class AllArticlesComponent implements OnInit {
  public articles$!: Observable<Article[]>;
  public article: string = 'Cтатьи о возможностях Angular и не только';
  public searchArticleName: any = '';

  constructor(
    private articleService: ArticleService,
  ) {}

  ngOnInit(): void {
    this.articles$ = this.articleService.getAllArticles();
  }

}
