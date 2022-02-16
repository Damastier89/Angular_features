import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../admin/shared/interfaces/article';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  @Input() article!: Article;

  constructor() { }

  ngOnInit(): void {}

}
