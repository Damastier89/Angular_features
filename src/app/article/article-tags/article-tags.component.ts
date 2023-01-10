import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-article-tags',
  templateUrl: './article-tags.component.html',
  styleUrls: ['./article-tags.component.scss']
})
export class ArticleTagsComponent implements OnInit {
  @Input(`allArticles`) public tagsProps!: any;
  constructor() { }

  ngOnInit(): void {
    console.log(`tagsProps`, this.tagsProps);
  }

}
