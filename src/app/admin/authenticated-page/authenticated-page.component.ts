import { Subject, takeUntil } from 'rxjs';
import { AuthService } from './../shared/services/auth.service';
import { Admin } from './../shared/interfaces/admin';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { SnackBarTypes } from '../../../app/shared/_models/snack-bar-types.enum';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-authenticated-page',
  templateUrl: './authenticated-page.component.html',
  styleUrls: ['./authenticated-page.component.scss'],
})
export class AuthenticatedPageComponent implements OnInit, OnDestroy {
  public form = new UntypedFormGroup({
    email: new UntypedFormControl("", [Validators.required, Validators.email]),
    password: new UntypedFormControl("", [Validators.required, Validators.minLength(7)]),
  });
  public submitted: boolean = false;
  public matcher = new MyErrorStateMatcher();

  private destroyNotifier: Subject<boolean> = new Subject<boolean>();

  constructor(
    public auth: AuthService,
    private router: Router,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyNotifier.next(true);
    this.destroyNotifier.complete();
  }

  public submit(): void {
    if ( this.form.invalid ) {
      return;
    }

    this.submitted = true;

    const admin: Admin = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true,
    }

    this.auth.authPassword(admin).pipe(takeUntil(this.destroyNotifier)).subscribe({
      next: () => {
        this.router.navigate(['/admin', 'create-article']);
        this.form.reset();
        this.submitted = false;
        this.openSnackBar(SnackBarTypes.Success, 'Вы вошли как [ admin ]');
      },
      error: () => {
        this.openSnackBar(SnackBarTypes.Error, 'Ошибка. Не верный пароль или email');
        this.form.reset();
        this.submitted = false;
      }
    })

  }

  private openSnackBar(actionType: string, message: string): void {
    this.snackBarService.openSnackBar({
      actionType,
      message,
    })
  }
}
