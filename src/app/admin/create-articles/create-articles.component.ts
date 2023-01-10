import { ArticleInterface } from '../shared/interfaces/article.interface';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { ConfirmComponent } from '../../shared/_models/confirm/confirm.component';
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
    tags: new UntypedFormControl(null, Validators.required),
  });
  public matcher = new MyErrorStateMatcher();
  public submitted: boolean = false;

  private confirmRef!: MatDialogRef<ConfirmComponent>;
  private destroyNotifier: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
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

        // const tags = this.form.value.tags;
        // const tagsArr = tags.replace(/ /g,'').split(','); // Удаляем все пробелы из строки и формируем массив строк

        const article: ArticleInterface = {
          title: this.form.value.title,
          content: this.form.value.content,
          author: this.form.value.author,
          tag: this.form.value.tags,
          date: new Date(),
        }
        this.submitted = true;
        this.articleService.createArticle(article).pipe(takeUntil(this.destroyNotifier)).subscribe({
          next: () => {
            this.form.reset();
            this.submitted = false;
            this.openSnackBar(SnackBarTypes.Success, 'Раздел добавлен успешно');
          },
          error: () => {
            this.form.reset();
            this.submitted = false;
            this.openSnackBar(SnackBarTypes.Error, 'Не удалось добавить раздел');
          }
        })
      } else {
        this.openSnackBar(SnackBarTypes.Warning, 'Добавление раздела прервано!')
      }

    });
  }

  private openSnackBar(actionType: string, message: string): void {
    this.snackBarService.openSnackBar({
      actionType,
      message,
    })
  }

}
