import { Subject, takeUntil } from 'rxjs';
import { AuthService } from './../shared/services/auth.service';
import { Admin } from './../shared/interfaces/admin';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { SnackBarTypes } from '../../../app/shared/_models/snack-bar-types.enum';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-authenticated-page',
  templateUrl: './authenticated-page.component.html',
  styleUrls: ['./authenticated-page.component.scss'],
})
export class AuthenticatedPageComponent implements OnInit {
  public form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(7)]),
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

    this.auth.authPassword(admin).pipe(takeUntil(this.destroyNotifier)).subscribe(() => {
      this.router.navigate(['/admin', 'create-article']);
      this.form.reset();
      this.submitted = false;
    }, () => {
      this.submitted = false;
    })
    this._openSnackBar(SnackBarTypes.Success, 'Вы вошли как ');
  }

  private _openSnackBar(actionType: string, message: string): void {
    message = message + '[ admin ] ';
    this.snackBarService.openSnackBar({
      actionType,
      message,
    })
  }
}
