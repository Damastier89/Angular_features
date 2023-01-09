import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ArticleInterface } from '../../admin/shared/interfaces/article.interface';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  @Input(`article`) public articleProps!: ArticleInterface;
  public articlesTag!: string | null;
  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    try {
      this.articlesTag = this.articleProps.tags.join(' ');
    } catch (error) {
      // console.log(error);
    }
  }

  public openArticle() {
    this.router.navigate(['/all_articles','article', this.articleProps.id], {
      queryParams: {
        showQueryParamsNavigate: `name_author:${this.articleProps.author}`,
      },
      fragment: 'program-fragment',
    });
  }

}
