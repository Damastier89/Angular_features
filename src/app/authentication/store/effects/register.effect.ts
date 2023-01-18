import { switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { registerAction } from '../actions/register.action';
import { AuthenticationService } from '../../services/authentication.service';

// Эффекты - идея эффектов следующая. Внутри эффекта мы обращаемся к API и в начале обращаения мы тригерим один Action а конце другой.
// Exemple: REGISTER - это начало, а конец это REGISTER_SUCCESS или REGISTER_FAILURE

@Injectable()
export class RegisterEffect {
	// TODO Доделать, когда пойму как работает NgRx Store
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
		private authService: AuthenticationService,
	) {}
}
