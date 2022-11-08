import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../admin/shared/interfaces/article';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  @Input() public article!: Article;
  public showQueryParams: string = '';
  public showQueryParamsNavigate: string = '';

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {}

  public openArticle() {
    this.router.navigate(['/article', this.article.id], {
      queryParams: {
        showQueryParamsNavigate: `name_author:${this.article.author}`,
      },
      fragment: 'program-fragment',
    });
  }

}
