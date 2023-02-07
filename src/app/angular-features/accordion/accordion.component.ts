import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
	ViewChild
} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {Observable, takeUntil} from "rxjs";
import {ArticleInterface} from "../../article/interfaces";
import {SnackBarTypes} from "../../shared/_models/snack-bar-types.enum";
import {ArticleDataService} from "../../article/services";
import {SnackBarService} from "../../shared/services/snack-bar.service";
import {AbstractDestroySubject} from "../../shared/directives/abstractDestroySubject.directive";

interface GroupedArticlesInterface {
	title: string;
	articles: ArticleInterface[];
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent extends AbstractDestroySubject implements OnInit {
	@ViewChild(MatAccordion) accordion!: MatAccordion;
	public panelOpenState: boolean = false;
	public allArticles: ArticleInterface[] = [];
	public groupedArticles: GroupedArticlesInterface[] = [];
	public quantityArticles: {} = {};
	public articles$!: Observable<any>;

  constructor(
		private articleDataService: ArticleDataService,
		private snackBarService: SnackBarService,
		private changeDetectorRef: ChangeDetectorRef,
	) {
		super();
		this.articles$ = this.articleDataService.getDataArticleSubscription();
	}

  ngOnInit(): void {
		this.getArticles();
  }

	public getArticles(): void {
		this.articleDataService.getDataArticle();
		this.articleDataService
			.getDataArticleSubscription()
			.pipe(takeUntil(this.onDestroy$))
			.subscribe({
				next: (articles: ArticleInterface[]) => {
					this.allArticles = articles;
					this.groupsByMedOrganization();
					this.changeDetectorRef.markForCheck();
				},
				error: () => {
					this.openSnackBar(SnackBarTypes.Error, 'Не удалось получить разделы');
				},
			});
	}

	public groupsByMedOrganization(): any {
		if (this.groupedArticles.length) {
			return;
		} else {
			this.quantityArticles = this.allArticles.reduce(function (prev: {[key: string ]: number}, cur: ArticleInterface) {
				prev[cur.tag] = (prev[cur.tag] || 0) + 1;
				return prev;
			}, {});

			const titleNames: string[] = this.allArticles.map((res) => {
				return res.tag;
			});

			const uniqueTitleName: Set<string> = new Set(titleNames);

			for (let key of uniqueTitleName) {
				const obj: GroupedArticlesInterface = {
					title: '',
					articles: []
				};
				obj.title = key;
				obj.articles = [...this.allArticles.filter((res: ArticleInterface) => res.tag === key)];
				this.groupedArticles.push(obj);
			}
		}
	}

	private openSnackBar(actionType: string, message: string): void {
		this.snackBarService.openSnackBar({
			actionType,
			message,
		});
	}

}
