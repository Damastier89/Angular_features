import { Article } from './../shared/interfaces/article';
import { SnackBarService } from './../../shared/services/snack-bar.service';
import { ConfirmComponent } from './../../shared/_models/confirm/confirm.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ArticleService } from 'src/app/admin/shared/services/article.service';
import { SnackBarTypes } from 'src/app/shared/_models/snack-bar-types.enum';
import { Subject, takeUntil } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-articles',
  templateUrl: './create-articles.component.html',
  styleUrls: ['./create-articles.component.scss']
})
export class CreateArticlesComponent implements OnInit, OnDestroy {
  public form = new UntypedFormGroup({
    title: new UntypedFormControl(null, Validators.required),
    content: new UntypedFormControl(null, Validators.required),
    author: new UntypedFormControl(null, Validators.required),
  });
  public matcher = new MyErrorStateMatcher();
  public submitted: boolean = false;

  private confirmRef!: MatDialogRef<ConfirmComponent>;
  private destroyNotifier: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private snackBarServive: SnackBarService,
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyNotifier.next(true);
    this.destroyNotifier.complete();
  }

  public submitArticle(): void {
    this.confirmRef = this.dialog.open(ConfirmComponent, {
      data: {
        text: 'Закончить добавление раздела?',
        buttons: {
          confirm: 'Да',
          cancel: 'Нет'
        }
      }
    });

    this.confirmRef.afterClosed().pipe(takeUntil(this.destroyNotifier)).subscribe((result: boolean) => {
      if (result) {
        if (this.form.invalid) {
          return;
        }
        const article: Article = {
          title: this.form.value.title,
          content: this.form.value.content,
          author: this.form.value.author,
          date: new Date(),
        }
        this.submitted = true;
        this.articleService.createArticle(article).pipe(takeUntil(this.destroyNotifier)).subscribe(() => {
          this.form.reset();
          this.submitted = false;
        })
      } else {
        this.openSnackBar(SnackBarTypes.Warning, 'Добавление раздела прервано!')
      }

    });
  }

  private openSnackBar(actionType: string, message: string): void {
    this.snackBarServive.openSnackBar({
      actionType,
      message,
    })
  }

}
