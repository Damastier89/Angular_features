import { ArticleService } from '../../admin/shared/services/article.service';
import { Observable, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ArticleInterface } from '../../admin/shared/interfaces/article.interface';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-article-content-page',
    templateUrl: './article-content-page.component.html',
    styleUrls: ['./article-content-page.component.scss'],
})
export class ArticleContentPageComponent implements OnInit {
    public articles$!: Observable<ArticleInterface>;

    constructor(private articleService: ArticleService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.articles$ = this.route.params.pipe(
            switchMap((params: Params) => {
                return this.articleService.getArticleById(params['id']);
            }),
        );

        this.route.fragment.subscribe((fragment) => {
            // console.log(`fragment`, fragment);
        });

        this.route.queryParams.subscribe((params) => {
            // console.log(`params`, params);
        });
    }
}
