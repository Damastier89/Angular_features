import { Component, OnInit } from '@angular/core';
import { FormGroupDirective, NgForm, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-angular-forms',
  templateUrl: './angular-forms.component.html',
  styleUrls: ['./angular-forms.component.scss']
})
export class AngularFormsComponent implements OnInit {
  public form = new UntypedFormGroup({
    title: new UntypedFormControl(null, Validators.required),
    content: new UntypedFormControl(null, Validators.required),
    author: new UntypedFormControl(null, Validators.required),
    age: new UntypedFormControl(null, [Validators.required, Validators.min(18), Validators.max(65)])
  });
  public matcher = new MyErrorStateMatcher();
  public submitted: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public submit(): void {}

}
