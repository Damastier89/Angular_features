import { Router } from '@angular/router';
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ArticleInterface } from '../../admin/shared/interfaces/article.interface';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnChanges {
  @Input() public articleProps!: ArticleInterface;
  constructor(
    private router: Router,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(`SimpleChanges`, changes);
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
