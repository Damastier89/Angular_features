import { UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';
import { AdminInterface } from '../shared/interfaces/admin.interface';
import { Component } from '@angular/core';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { SnackBarTypes } from '../../shared/_models/snack-bar-types.enum';
import { AbstractDestroySubject } from 'src/app/shared/directives/abstractDestroySubject.directive';
import { EmployeeDataService } from '../../shared/services/employeeData.service';

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
export class AuthenticatedPageComponent extends AbstractDestroySubject {
  public form = new UntypedFormGroup({
    email: new UntypedFormControl("", [Validators.required, Validators.email]),
    password: new UntypedFormControl("", [Validators.required, Validators.minLength(7)]),
  });
  public submitted: boolean = false;
  public matcher = new MyErrorStateMatcher();

  private currentUserName: string = 'Unknown user';

  constructor(
    public auth: AuthService,
    private router: Router,
    private snackBarService: SnackBarService,
    private employeeDataService: EmployeeDataService,
  ) {
    super()
  }

  public submit(): void {
    if ( this.form.invalid ) {
      return;
    }

    this.submitted = true;

    const admin: AdminInterface = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true,
    }

    this.auth.authPassword(admin).pipe(
      takeUntil(this.onDestroy$),
      tap(() => {
        this.currentUserName = this.employeeDataService.getNameCurrentUser();
      })
    ).subscribe({
      next: () => {
        this.router.navigate(['/admin', 'create-article']);
        this.form.reset();
        this.submitted = false;
        this.openSnackBar(SnackBarTypes.Success, `Вы вошли как [ ${this.currentUserName} ]`);
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
