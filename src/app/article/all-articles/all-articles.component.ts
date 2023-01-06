import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

import { SnackBarService } from '../../shared/services/snack-bar.service';
import { ArticleInterface } from '../../admin/shared/interfaces/article.interface';
import { ArticleDataService } from '../../admin/shared/services/articleData.service';
import { SnackBarTypes } from '../../shared/_models/snack-bar-types.enum';
import { MatPaginator, PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss']
})
export class AllArticlesComponent implements OnInit, OnDestroy {
  public allArticles: ArticleInterface[] = [];
  public article: string = 'Cтатьи о возможностях Angular и не только';
  public searchArticleName: any = '';

  // Pagination
  @ViewChild('paginator') public paginator!: MatPaginator;
  public articles$!: Observable<any>;
  public dataSource!: MatTableDataSource<ArticleInterface>;
  public pageSizes: number[] = [3, 6, 9]; // выбор количества элементов на каждой странице
  // public currentPage = 0;
  // public pageSize: number = 3; // количество элементов на каждой странице
  // public totalPage: number = 0;

  private queryParamsSubscription!: Subscription; // Один из вариантов отписки
  private destroyNotifier: Subject<boolean> = new Subject<boolean>(); // Один из вариантов отписки

  constructor(
    private articleDataService: ArticleDataService,
    private snackBarService: SnackBarService,
    private changeDetectorRef: ChangeDetectorRef,
    // private router: Router,
    // private route: ActivatedRoute, // Используем для подписки на изменении в url страницы
  ) {}

  ngOnInit(): void {
    this.getArticles();
    // console.log(`BaseUrl`, this.router.url);  // Показывает адрес текущей страницы
    // this.initializeListeners();
    // this.baseUrl = this.router.url.split('?')[0]; // Разбиваем ссылку по переданному query параметру
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next(true);
    this.destroyNotifier.complete();

    this.queryParamsSubscription.unsubscribe();
  }

  public getArticles(): void {
    this.articleDataService.getDataArticle();
    this.articleDataService.getDataArticleSubscription().pipe(
      takeUntil(this.destroyNotifier)
    ).subscribe({
      next: (articles: ArticleInterface[]) => {
        this.allArticles = articles;
        this.dataSource = new MatTableDataSource<ArticleInterface>(this.allArticles);
        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.articles$ = this.dataSource.connect();
      },
      error: () => {
        this.openSnackBar(SnackBarTypes.Error, 'Не удалось получить разделы');
      }
    })
  }

  // public pageChangeEvent(page: PageEvent) {
  //   this.currentPage = page.pageIndex;
  //   this.pageSize = page.pageSize;
  //
  //   console.log(`page.pageIndex`, page.pageIndex);
  //   console.log(`page.pageSize`, page.pageSize);
  //   console.log(`page`, page);
  //
  //   this.getArticles();
  // }

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
