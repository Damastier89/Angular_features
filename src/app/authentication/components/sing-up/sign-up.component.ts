import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { registerAction } from '../../store/actions/register.action';
import { isSubmittingSelector } from '../../store/selections/selectors';
import { RegisterRequestInterface } from '../../types/registerUser.interface';

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
	public form = new FormGroup({
		username: new FormControl('', [Validators.required]),
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.minLength(7)]),
	});

	public matcher = new MyErrorStateMatcher();

	public isSubmitting$!: Observable<boolean>;

	constructor(private authService: AuthenticationService, private store: Store) {}

	ngOnInit() {
		this.initializeValues();
		this.isSubmitting$.subscribe((res) => {
			console.log(`this.isSubmitting$`, res);
		});
	}

	public initializeValues(): void {
		// Данная констукция выбирает данные из Store по переданному селектору.
		this.isSubmitting$ = this.store.select(isSubmittingSelector);
	}

	public createNewUser() {
		const username: string = this.form.value.username as string,
			mail: string = this.form.value.email as string,
			password: any = this.form.value.password;

		this.authService.username.next(username);
		this.authService.signUp(mail, password);

		const user: RegisterRequestInterface = {
			username: username,
			email: mail,
			password: password,
		};

		// dispatch - метод для вызова acnions
		this.store.dispatch(registerAction(user));
	}
}
