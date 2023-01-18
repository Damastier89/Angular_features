import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { SnackBarService } from '../../../../shared/services/snack-bar.service';
import { SnackBarTypes } from '../../../../shared/_models/snack-bar-types.enum';
import { AuthService } from '../../services/auth.service';
import { AdminInterface } from '../../interfaces/admin.interface';
import { adminAction, adminFailuerAction, adminSuccessAction } from '../actions/admin.action';

// Эффекты - идея эффектов следующая. Внутри эффекта мы обращаемся к API и в начале обращения мы тригерим один Action а конце другой.
// Example: ADMIN - это начало, а конец это ADMIN_SUCCESS или ADMIN_FAILURE
@Injectable()
export class AdminEffect {
    constructor(
        private action$: Actions, // action$ - это все actions которые есть в нашем приложении
        private authService: AuthService,
        private snackBarService: SnackBarService,
        private router: Router,
    ) {}

    // Создаем effect
    public register$ = createEffect(() =>
        this.action$.pipe(
            // ofType - оставляет только переданные actions из всех имеющихся в приложении, то есть фильтрует по переданному action
            // Сокращает весь поток до одного action
            ofType(adminAction),
            // на вход в switchMap получаем отфильтрованный adminAction
            switchMap((adminData: AdminInterface) => {
                return this.authService.authPassword(adminData).pipe(
                    map((adminInfo: any) => {
                        this.openSnackBar(
                            SnackBarTypes.Success,
                            `Вы вошли как ${adminInfo.displayName ? adminInfo.displayName : 'unknown user'}`,
                        );
                        return adminSuccessAction(adminInfo);
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        this.openSnackBar(SnackBarTypes.Error, `Ошибка. Не верный пароль или email`);
                        return of(adminFailuerAction(errorResponse.error));
                    }),
                );
            }),
        ),
    );

    public redirectAfterSuccessSubmit$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(adminSuccessAction),
                tap(() => {
                    this.router.navigate(['/admin', 'create-article']);
                }),
            ),
        { dispatch: false }, // Это нужно для того, чтобы не зависла страничка
    );

    private openSnackBar(actionType: string, message: string): void {
        this.snackBarService.openSnackBar({
            actionType,
            message,
        });
    }
}
