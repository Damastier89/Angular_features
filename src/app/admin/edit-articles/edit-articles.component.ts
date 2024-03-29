import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroupDirective, NgForm, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { SnackBarTypes } from '../../shared/_models/snack-bar-types.enum';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { ConfirmComponent } from '../../shared/_models/confirm/confirm.component';
import { ArticleInterface } from '../../article/interfaces/article.interface';
import { ArticleService } from '../../article/services/article.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
	selector: 'app-edit-articles',
	templateUrl: './edit-articles.component.html',
	styleUrls: ['./edit-articles.component.scss'],
})
export class EditArticlesComponent implements OnInit, OnDestroy {
	public matcher = new MyErrorStateMatcher();

	public submitted: boolean = false;

	public form!: UntypedFormGroup;

	public article!: ArticleInterface;

	private confirmRef!: MatDialogRef<ConfirmComponent>;

	private destroyNotifier: Subject<boolean> = new Subject<boolean>();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private articleService: ArticleService,
		private dialog: MatDialog,
		private sneckBarService: SnackBarService,
	) {}

	ngOnInit(): void {
		this.route.params
			.pipe(
				switchMap((params) => {
					return this.articleService.getArticleById(params['id']);
				}),
			)
			.pipe(takeUntil(this.destroyNotifier))
			.subscribe((article) => {
				this.article = article;
				this.form = new UntypedFormGroup({
					title: new UntypedFormControl(this.article.title),
					content: new UntypedFormControl(this.article.content),
					author: new UntypedFormControl(this.article.author),
				});
			});
	}

	ngOnDestroy(): void {
		this.destroyNotifier.next(true);
		this.destroyNotifier.complete();
	}

	public editArticle() {
		this.confirmRef = this.dialog.open(ConfirmComponent, {
			data: {
				text: 'Закончить редактирование?',
				buttons: {
					confirm: 'Да',
					cancel: 'Нет',
				},
			},
		});

		this.confirmRef
			.afterClosed()
			.pipe(takeUntil(this.destroyNotifier))
			.subscribe((result: boolean) => {
				if (result) {
					if (this.form.invalid) {
						return;
					}

					this.submitted = true;
					this.articleService
						.updateArticle({
							...this.article,
							title: this.form.value.title,
							content: this.form.value.content,
							author: this.form.value.author,
							date: new Date(),
						})
						.pipe(takeUntil(this.destroyNotifier))
						.subscribe({
							next: () => {
								this.submitted = false;
								this.router.navigate(['/admin', 'dashboard']);
								this.openSnackBar(SnackBarTypes.Success, 'Раздел отредактирован');
							},
							error: () => {
								this.submitted = false;
								this.router.navigate(['/admin', 'edit']);
								this.openSnackBar(SnackBarTypes.Error, 'Не удалось отредактировать раздел');
							},
						});
				} else {
					this.openSnackBar(SnackBarTypes.Warning, 'Редактирование раздела прервано');
				}
			});
	}

	private openSnackBar(actionType: string, message: string): void {
		this.sneckBarService.openSnackBar({
			actionType,
			message,
		});
	}
}
