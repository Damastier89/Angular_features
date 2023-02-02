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
					this.changeDetectorRef.markForCheck();
				},
				error: () => {
					this.openSnackBar(SnackBarTypes.Error, 'Не удалось получить разделы');
				},
			});
	}

	private openSnackBar(actionType: string, message: string): void {
		this.snackBarService.openSnackBar({
			actionType,
			message,
		});
	}

}
