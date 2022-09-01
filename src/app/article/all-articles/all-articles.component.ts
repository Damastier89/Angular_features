import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { SnackBarService } from '../../shared/services/snack-bar.service';
import { Article } from '../../admin/shared/interfaces/article';
import { ArticleDataService } from '../../admin/shared/services/articleData.service';
import { SnackBarTypes } from '../../shared/_models/snack-bar-types.enum';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss']
})
export class AllArticlesComponent implements OnInit, OnDestroy {
  public allArticles!: Article[];
  public article: string = 'Cтатьи о возможностях Angular и не только';
  public searchArticleName: any = '';

  private destroyNotifier: Subject<boolean> = new Subject<boolean>();

  constructor(
    private articleDataService: ArticleDataService,
    private snackBarServive: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.articleDataService.getDataArticle();
    this.articleDataService.getDataArticleSubscription().pipe(
      takeUntil(this.destroyNotifier)
    ).subscribe({
      next: (articles: Article[]) => {
        this.allArticles = articles;
      },
      error: () => {
        this.openSnackBar(SnackBarTypes.Error, 'Не удалось получить разделы');
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next(true);
    this.destroyNotifier.complete();
  }

  private openSnackBar(actionType: string, message: string): void {
    this.snackBarServive.openSnackBar({
      actionType,
      message,
    })
  }
}
