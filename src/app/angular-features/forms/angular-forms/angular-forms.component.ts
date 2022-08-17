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
    name: new UntypedFormControl('', Validators.required),
    surname: new UntypedFormControl('', Validators.required),
    age: new UntypedFormControl('', [Validators.required, Validators.min(18), Validators.max(65)]),
    dateOfBirth: new UntypedFormControl('', Validators.required),
    address: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', Validators.required),
  });
  public matcher = new MyErrorStateMatcher();
  public submitted: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.form.controls['name'].setValue('VPN')
  }

  public submit(): void {
    console.log(`form : `, this.form)
    console.log(`form dateOfBirth : `, this.form.value.dateOfBirth.toDateString())
  }

}
