import { UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Observable, takeUntil, tap } from 'rxjs';

import { Store } from '@ngrx/store';

import { AuthService } from '../shared/services/auth.service';
import { AdminInterface } from '../shared/interfaces/admin.interface';
import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { SnackBarTypes } from '../../shared/_models/snack-bar-types.enum';
import { AbstractDestroySubject } from 'src/app/shared/directives/abstractDestroySubject.directive';
import { EmployeeDataService } from '../../shared/services/employeeData.service';
import { adminAction } from '../shared/store/actions/admin.action';
import { isAdminLogged } from '../shared/store/selectors/selectors';

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
export class AuthenticatedPageComponent extends AbstractDestroySubject implements OnInit {
	public form = new UntypedFormGroup({
		email: new UntypedFormControl('', [Validators.required, Validators.email]),
		password: new UntypedFormControl('', [Validators.required, Validators.minLength(7)]),
	});

	public submitted: boolean = false;

	public isSubmitted$!: Observable<boolean>;

	public matcher = new MyErrorStateMatcher();

	constructor(
		public auth: AuthService,
		private router: Router,
		private snackBarService: SnackBarService,
		private employeeDataService: EmployeeDataService,
		private store: Store,
	) {
		super();
	}

	public ngOnInit(): void {
		this.initializeStoreSelectors();
		this.checkIsLoggedAdmin();
	}

	public submit(): void {
		if (this.form.invalid) {
			return;
		}

		// this.submitted = true;

		const admin: AdminInterface = {
			email: this.form.value.email,
			password: this.form.value.password,
			returnSecureToken: true,
		};

		this.store.dispatch(adminAction(admin));

		// Перенесено в admin.effect.ts
		// this.auth.authPassword(admin).pipe(
		//   takeUntil(this.onDestroy$),
		//   tap(() => {
		//     this.currentUserName = this.employeeDataService.getNameCurrentUser();
		//   })
		// ).subscribe({
		//   next: () => {
		//     this.router.navigate(['/admin', 'create-article']);
		//     this.form.reset();
		//     this.submitted = false;
		//     this.openSnackBar(SnackBarTypes.Success, `Вы вошли как [ ${this.currentUserName} ]`);
		//   },
		//   error: () => {
		//     this.openSnackBar(SnackBarTypes.Error, 'Ошибка. Не верный пароль или email');
		//     this.form.reset();
		//     this.submitted = false;
		//   }
		// })
		// Так же возможен вариант с Store
	}

	private initializeStoreSelectors(): void {
		this.isSubmitted$ = this.store.select(isAdminLogged);
	}

	private checkIsLoggedAdmin(): void {
		this.isSubmitted$.subscribe((isLogged: boolean) => {
			this.submitted = isLogged;
			if (isLogged) {
				this.form.reset();
			}
		});
	}
}
