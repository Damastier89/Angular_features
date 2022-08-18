import { Component, OnInit } from '@angular/core';
import { FormGroupDirective, NgForm, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as moment from 'moment';
import { Moment } from 'moment';

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
    sex: new UntypedFormControl('', Validators.required),
    address: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', Validators.required),
    phone: new UntypedFormControl('', Validators.required),
    about: new UntypedFormControl(''),
  });
  public matcher = new MyErrorStateMatcher();
  public submitted: boolean = false;

  // public get aboutControl(): UntypedFormArray {
  //   return this.form.get('about') as UntypedFormArray;
  // }

  constructor() { }

  ngOnInit(): void {
    this.form.controls['name'].setValue('VPN')
    this.form.controls['surname'].setValue('VPN')
    this.form.controls['age'].setValue('VPN')
    this.form.controls['address'].setValue('VPN')
    this.form.controls['email'].setValue('VPN')
    this.form.controls['phone'].setValue('VPN')
  }

  public submit(): void {
    const date = new Date(this.form.value.dateOfBirth);
    const now = moment(date).format("DD.MM.YYYY");
    console.log(`form : `, this.form)
    console.log(`moment dateOfBirth : `, now); 
    console.log(`form dateOfBirth : `, this.form.value.dateOfBirth.toDateString());
    // this.form.reset();
  }

  // public addAboute(): void {
  //   const control: any = new UntypedFormControl('');
  //   (this.form.get('about') as UntypedFormArray).push(control);
  // }

}
