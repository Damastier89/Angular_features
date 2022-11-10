import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import * as auth from 'firebase/auth';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { User } from "../interfaces/user";
import { SnackBarService } from "./snack-bar.service";
import { SnackBarTypes } from "../_models/snack-bar-types.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public userData: any; // Сохранить учетные данные пользователя.

  // Returns true when user is looged in and email is verified
  public get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  constructor(
    public angularFirestore: AngularFirestore, // Inject Firestore service
    public angularFireAuth: AngularFireAuth,  // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private snackBarService: SnackBarService,
  ) {
    // Сохранение пользовательских данных в localstorage при вход в систему и установка null при выходе
    this.angularFireAuth.authState.subscribe((user: any) => {
      if (user) {
        // TODO - собрать безопасный объект пользователя
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Войти с помощью электронной почты / пароля
  public signIn(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        this.setUserData(result.user);
        this.angularFireAuth.authState.subscribe((user: any) => {
          if (user) {
            this.router.navigate(['/main-page']);
            this.openSnackBar(SnackBarTypes.Success, `Вы авторизовались как [ ${user.email} ]`, null);
          }
        });
      })
      .catch((error) => {
        this.openSnackBar(SnackBarTypes.Error, `Ошибка : ${error.message}`, 10000);
      });
  }

  // Зарегистрироваться с помощью электронной почты / пароля
  public signUp(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        // Верифекация работает, нужно подумать что с ней дальше делать
        // this.sendVerificationMail();
        this.setUserData(result.user);
        this.router.navigate(['/sing-in']);
        // Events используется для отслеживания маршрута
        // this.router.events.subscribe(e => console.log(`e`, e))
        this.openSnackBar(SnackBarTypes.Success, `Профиль [ ${result.user.email} ] успешно создан `, null);
      })
      .catch(() => {
        this.openSnackBar(SnackBarTypes.Error, `Ошибка : Firebase: адрес электронной почты уже используется другой учетной записью.`, 10000);
      });
  }

  // Выйти из профиля
  public signOut() {
    return this.angularFireAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
      });
  }

  public forgotPassword(passwordResetEmail: string) {
    return this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Send email verfificaiton when new user sign up
  public sendVerificationMail() {
    return this.angularFireAuth.currentUser
      .then((user: any) => user.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  private setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, { merge: true });
  }

  private openSnackBar(actionType: string, message: string, duration: number | null): void {
    if (duration) {
      this.snackBarService.openSnackBarSetDuration({actionType, message}, duration);
    } else {
      this.snackBarService.openSnackBar({actionType, message});
    }
  }

}