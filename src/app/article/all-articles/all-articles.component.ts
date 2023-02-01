import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component, OnChanges,
	OnDestroy,
	OnInit, SimpleChanges,
	ViewChild
} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Observable, Subject, Subscription, takeUntil} from 'rxjs';

import {SnackBarService} from '../../shared/services/snack-bar.service';
import {ArticleInterface} from '../interfaces';
import {ArticleDataService} from '../services';
import {SnackBarTypes} from '../../shared/_models/snack-bar-types.enum';
import {SortingTypeInterface} from "../interfaces/sorting-type.interface";
import {SORTING} from "../types/sorting.type";
import {MatSelectChange} from "@angular/material/select";
import {sortingByPassedProperties} from "../../shared/utils/sorting-by-passed-properties";
import {MatSort} from "@angular/material/sort";

@Component({
	selector: 'app-all-articles',
	templateUrl: './all-articles.component.html',
	styleUrls: ['./all-articles.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllArticlesComponent implements OnInit, OnDestroy {
	public allArticles: ArticleInterface[] = [];
	public article: string = 'Cтатьи о возможностях Angular и не только';
	public searchArticleName: any = '';

	@ViewChild(MatSort) sort!: MatSort;
	// Pagination
	@ViewChild('paginator') public paginator!: MatPaginator;

	public articles$!: Observable<any>;
	public dataSource!: MatTableDataSource<ArticleInterface>;
	public pageSizes: number[] = [4, 8, 12]; // выбор количества элементов на каждой странице
	// public currentPage = 0;
	// public pageSize: number = 3; // количество элементов на каждой странице
	// public totalPage: number = 0;

	public sortingTypeOptions: SortingTypeInterface[] = [
		{ value: SORTING.BY_DATE_PUBLICATION, view: 'дате публикации' },
		{ value: SORTING.BY_TAGS, view: 'тегам' },
		{ value: SORTING.BY_AUTHORS, view: 'автору' },
	]

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
		// this.queryParamsSubscription.unsubscribe();
	}

	public getArticles(): void {
		this.articleDataService.getDataArticle();
		this.articleDataService
			.getDataArticleSubscription()
			.pipe(takeUntil(this.destroyNotifier))
			.subscribe({
				next: (articles: ArticleInterface[]) => {
					this.allArticles = articles;
					this.dataSource = new MatTableDataSource<ArticleInterface>(articles);
					this.changeDetectorRef.detectChanges();
					this.dataSource.paginator = this.paginator;
					this.articles$ = this.dataSource.connect();
					this.changeDetectorRef.markForCheck();
				},
				error: () => {
					this.openSnackBar(SnackBarTypes.Error, 'Не удалось получить разделы');
				},
			});
	}

	public getOptionForSorting(param: MatSelectChange): void {
		switch (param.value) {
			case SORTING.BY_DATE_PUBLICATION:
				sortingByPassedProperties(this.allArticles, 'date');
				break;
			case SORTING.BY_AUTHORS:
				sortingByPassedProperties(this.allArticles, 'author');
				this.dataSource.sort = this.sort;
				break;
			case SORTING.BY_TAGS:
				sortingByPassedProperties(this.allArticles, 'tag');
				break;
		}
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
	//  this.route.params.subscribe((params: Params) => {
	//    console.info(`params`, params);
	//  });
	// }

	private openSnackBar(actionType: string, message: string): void {
		this.snackBarService.openSnackBar({
			actionType,
			message,
		});
	}
}
