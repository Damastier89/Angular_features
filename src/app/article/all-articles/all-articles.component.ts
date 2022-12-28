import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subject, Subscription, takeUntil } from 'rxjs';

import { SnackBarService } from '../../shared/services/snack-bar.service';
import { ArticleInterface } from '../../admin/shared/interfaces/article.interface';
import { ArticleDataService } from '../../admin/shared/services/articleData.service';
import { SnackBarTypes } from '../../shared/_models/snack-bar-types.enum';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss']
})
export class AllArticlesComponent implements OnInit, OnDestroy {
  public allArticles!: ArticleInterface[];
  public article: string = 'Cтатьи о возможностях Angular и не только';
  public searchArticleName: any = '';

  // Pagination
  public count: number = 0;
  public page: number = 1; // текущая страница
  public pageSize: number = 3; // количество элементов на каждой странице
  public pageSizes: number[] = [3, 6, 9];

  private queryParamsSubscription!: Subscription; // Один из вариантов отписки
  private destroyNotifier: Subject<boolean> = new Subject<boolean>(); // Один из вариантов отписки

  constructor(
    private articleDataService: ArticleDataService,
    private snackBarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute, // Используем для подписки на изменении в url страницы
  ) {}

  ngOnInit(): void {
    // console.log(`BaseUrl`, this.router.url);  // Показывает адрес текущей страницы
    // this.initializeListeners();
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

  public handlePageChange(event: number): void {
    this.page = event;
  }

  public handlePageSizeChange(event: any): void {
    console.log(`event`, event)
    this.pageSize = event.target.value;
    this.page = 1;
  }

  // private initializeListeners(): void {
  //   // params - это query параметры нашей страницы
  //   this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
  //     console.info(`params`, params);
  //     this.page = Number(params || '1')
  //   });
  // }

  private openSnackBar(actionType: string, message: string): void {
    this.snackBarService.openSnackBar({
      actionType,
      message,
    })
  }
}
