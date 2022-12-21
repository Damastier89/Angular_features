import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ArticleInterface } from '../../admin/shared/interfaces/article.interface';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  @Input() public article!: ArticleInterface;
  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {}

  public openArticle() {
    this.router.navigate(['/all_articles','article', this.article.id], {
      queryParams: {
        showQueryParamsNavigate: `name_author:${this.article.author}`,
      },
      fragment: 'program-fragment',
    });
  }

}
