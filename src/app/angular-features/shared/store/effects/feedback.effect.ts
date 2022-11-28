import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { FeedbackFormService } from "../../services/feedbackForm.service";

// Эффекты - идея эффектов следующая. Внутри эффекта мы обращаемся к API и в начале обращаения мы тригерим один Action а конце другой.
// Exemple: FEEDBACK - это начало, а конец это FEEDBACK_SUCCESS или FEEDBACK_FAILURE
@Injectable()
export class FeedbackEffect {
  // public register$ = createEffect(() => this.action$.pipe(
  //   // Указываем тип actions
  //   ofType(registerAction),
  //   switchMap(action => {
  //     return this.authService.signUp(action).then(
  //     )
  //   }),
  // ));
  
  constructor(
    // action$ - это все actions которые есть в нашем приложении
    private action$: Actions,
    private feedbackFormService: FeedbackFormService,
  ) {}
}