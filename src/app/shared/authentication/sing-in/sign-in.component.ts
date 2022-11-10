import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subject } from 'rxjs';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(7)]),
  });
  public submitted: boolean = false;
  public matcher = new MyErrorStateMatcher();

  constructor(
    public authService: AuthenticationService,
  ) { }

  ngOnInit() { }

  public log() {
    const mail: any = this.form.value.email;
    const pass: any = this.form.value.password;
    this.authService.signIn(mail, pass);
  }
}