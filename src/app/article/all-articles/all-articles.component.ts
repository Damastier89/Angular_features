import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subject, Subscription, takeUntil } from 'rxjs';

import { SnackBarService } from '../../shared/services/snack-bar.service';
import { ArticleInterface } from '../../admin/shared/interfaces/article.interface';
import { ArticleDataService } from '../../admin/shared/services/articleData.service';
import { SnackBarTypes } from '../../shared/_models/snack-bar-types.enum';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss']
})
export class AllArticlesComponent implements OnInit, OnDestroy {
  public allArticles!: ArticleInterface[];
  public article: string = 'Cтатьи о возможностях Angular и не только';
  public searchArticleName: any = '';
  public limit: number = environment.limit;
  public currentPage!: number; // адрес текущей страницы
  private queryParamsSubscription!: Subscription; // Один из вариантов отписки
  private destroyNotifier: Subject<boolean> = new Subject<boolean>(); // Один из вариантов отписки

  constructor(
    private articleDataService: ArticleDataService,
    private snackBarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute, // Используем для подписки на изменении в url страницы
  ) {}

  ngOnInit(): void {
    console.log(`BaseUrl`, this.router.url);  // Показывает адрес текущей страницы
    this.initializeListeners();
    // this.baseUrl = this.router.url.split('?')[0]; // Разбиваем ссылку по переданному query параметру
    this.articleDataService.getDataArticle();
    this.articleDataService.getDataArticleSubscription().pipe(
      takeUntil(this.destroyNotifier)
    ).subscribe({
      next: (articles: ArticleInterface[]) => {
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

    this.queryParamsSubscription.unsubscribe();
  }

  private initializeListeners(): void {
    // params - это query параметры нашей страницы
    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
      console.info(`params`, params);
      this.currentPage = Number(params || '1')
    });
  }

  private openSnackBar(actionType: string, message: string): void {
    this.snackBarService.openSnackBar({
      actionType,
      message,
    })
  }
}
