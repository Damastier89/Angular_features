import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { SnackBarTypes } from "src/app/shared/_models/snack-bar-types.enum";

import { SnackBarService } from "../../../../shared/services/snack-bar.service";
import { DataFormInterface } from "../../interfaces/dataForm.interface";
import { FeedbackFormService } from "../../services/feedbackForm.service";
import { feedbackAction, feedbackFailuerAction, feedbackSuccessAction } from "../actions/feedback.action";

// Эффекты - идея эффектов следующая. Внутри эффекта мы обращаемся к API и в начале обращаения мы тригерим один Action а конце другой.
// Exemple: FEEDBACK - это начало, а конец это FEEDBACK_SUCCESS или FEEDBACK_FAILURE
@Injectable()
export class FeedbackEffect {
  
  constructor(
    // action$ - это все actions которые есть в нашем приложении
    private action$: Actions,
    private feedbackFormService: FeedbackFormService,
    private snackBarService: SnackBarService,
    private router: Router,
  ) {}

  // Создаем effect
  public register$ = createEffect(() => this.action$.pipe(
    // ofType - оставляет только переданные actions из всех имеющихся в приложении, то есть фильтрует по переданному action
    // Сокращает весь поток до одного action
    ofType(feedbackAction),
    // на вход в switchMap получаем отфильтрованный feedbackAction
    switchMap( (feedbackData: DataFormInterface) => {
      return this.feedbackFormService.createNewDataFromForm(feedbackData).pipe(
        map((feedback: any) => {
          this.openSnackBar(SnackBarTypes.Success, 'Данные успешно отправлены');
          this.router.navigate(['/angular-features','form-result']);
          return feedbackSuccessAction(feedback)
        }),
        catchError(() => {
          return of(feedbackFailuerAction())
        })
      );
    }),
    tap((res) => {
      console.log(`res`, res);
    }),
  ));

  private openSnackBar(actionType: string, message: string): void {
    this.snackBarService.openSnackBar({
      actionType,
      message,
    })
  }
}