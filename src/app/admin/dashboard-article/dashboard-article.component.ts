import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ArticleInterface } from '../shared/interfaces/article.interface';
import { ArticleService } from '../shared/services/article.service';
import { ArticleDataService } from '../shared/services/articleData.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { SnackBarTypes } from '../../shared/_models/snack-bar-types.enum';

@Component({
    selector: 'app-dashboard-article',
    templateUrl: './dashboard-article.component.html',
    styleUrls: ['./dashboard-article.component.scss'],
})
export class DashboardArticleComponent implements OnInit, OnDestroy {
    public articles: ArticleInterface[] = [];

    public searchArticleName: any = '';

    private destroyNotifier: Subject<boolean> = new Subject<boolean>();

    constructor(
        private articleService: ArticleService,
        private articleDataService: ArticleDataService,
        private snackBarServive: SnackBarService,
    ) {}

    ngOnInit(): void {
        this.articleDataService.getDataArticle();
        this.articleDataService
            .getDataArticleSubscription()
            .pipe(takeUntil(this.destroyNotifier))
            .subscribe({
                next: (article: ArticleInterface[]) => {
                    this.articles = article;
                },
                error: () => {
                    this.openSnackBar(SnackBarTypes.Error, 'Не удалось получить разделы');
                },
            });
    }

    ngOnDestroy(): void {
        this.destroyNotifier.next(true);
        this.destroyNotifier.complete();
    }

    public removeArticle(id: any): void {
        this.articleService
            .removeArticle(id)
            .pipe(takeUntil(this.destroyNotifier))
            .subscribe(() => {
                this.articles = this.articles.filter((article) => article.id !== id);
            });
    }

    private openSnackBar(actionType: string, message: string): void {
        this.snackBarServive.openSnackBar({
            actionType,
            message,
        });
    }
}
