import { Router } from '@angular/router';
import { AuthService } from '../../admin/shared/services/auth.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

/*
 * Перехватчик http запросов. Входящий http запрос - request, этот запрос клонируются и как-то дополняется.
 * Далее в next возвращается уже измененный/дополненный запрос.
 * Прослойка между frontend и API
 * */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      request = request.clone({
        setParams: {
          auth: this.authService.token,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/admin', '']);
        }
        return throwError(() => error);
      }),
    );
  }
}
