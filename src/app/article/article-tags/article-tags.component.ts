import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-article-tags',
  templateUrl: './article-tags.component.html',
  styleUrls: ['./article-tags.component.scss']
})
export class ArticleTagsComponent {
  @Input() public tagsProps!: any;
  constructor() { }

}
