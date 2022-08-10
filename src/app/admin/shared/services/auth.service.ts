import { environment } from './../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, Subject, throwError } from 'rxjs';
import { Admin } from './../interfaces/admin';
import { Injectable } from '@angular/core';

const env = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor( private http: HttpClient ) { }

  public get token(): any {
    const expDate = new Date(localStorage.getItem('fb-token-exp') as string);
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  public authPassword(admin: Admin): Observable<Admin> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env}`, admin)
    .pipe(
      tap(this.setToken),
      catchError(this.hendelError.bind(this))
    );
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public logout(): void {
    this.setToken(null);
  }

  private setToken(response: any | null): any {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem(`fb-token`, response.idToken);
      localStorage.setItem(`fb-token-exp`, expDate.toString());
    } else {
      localStorage.removeItem(`fb-token`);
      localStorage.removeItem(`fb-token-exp`);
    }
  }

  private hendelError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch(message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Данный email не найден')
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email')
        break;
    }
    return throwError(() => new Error(message));
  }
}
