import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroupDirective, NgForm, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as moment from 'moment';
import { SnackBarTypes } from '../../../shared/_models/snack-bar-types.enum';

import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { DataForm } from '../../shared/interfaces/formData';
import { FormService } from '../../shared/services/form.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

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
export class AngularFormsComponent implements OnInit, OnDestroy {
  public form = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    surname: new UntypedFormControl('', Validators.required),
    age: new UntypedFormControl('', [Validators.required, Validators.min(18), Validators.max(30)]),
    dateOfBirth: new UntypedFormControl('', Validators.required),
    sex: new UntypedFormControl('', Validators.required),
    address: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    phone: new UntypedFormControl('', Validators.required),
    about: new UntypedFormControl(''),
    skills: new UntypedFormArray([]),
  });
  public matcher = new MyErrorStateMatcher();
  public submitted: boolean = false;
  public isAbout: boolean = false;
  public browserName: string = '';
  public browserVersion: string = '';

  private destroyNotifier: Subject<boolean> = new Subject<boolean>();

  public get aboutControl(): UntypedFormArray {
    return this.form.get('skills') as UntypedFormArray;
  }

  constructor(
    private formService: FormService,
    private snackBarService: SnackBarService,
    private router: Router,
  ) { }

  // ngOnInit(): void {
  //   // this.form.controls['name'].setValue('VPN')
  //   // this.form.controls['surname'].setValue('VPN')
  //   // this.form.controls['age'].setValue('VPN')
  //   // this.form.controls['address'].setValue('VPN@mmk.ru')
  //   // this.form.controls['email'].setValue('VPN@mmk.ru')
  //   // this.form.controls['phone'].setValue('VPN')
  // }

  ngOnInit() {
    this.form.controls['name'].setValue('Maxim')
    this.form.controls['surname'].setValue('Ivanov')
    this.form.controls['age'].setValue('30')
    this.form.controls['address'].setValue('Moscow')
    this.form.controls['email'].setValue('Maxim@mmk.ru')
    // this.form.controls['phone'].setValue('VPN')

    this.browserName = this.detectBrowserName();
    this.browserVersion = this.detectBrowserVersion();
    console.log(this.browserName)
    console.log(this.browserVersion)
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next(true);
    this.destroyNotifier.complete();
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
  }

    const date = new Date(this.form.value.dateOfBirth);
    const now = moment(date).format("DD.MM.YYYY");

    const dataFromForm: DataForm = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      age: this.form.value.age,
      dateOfBirth: now,
      sex: this.form.value.sex,
      address: this.form.value.address,
      email: this.form.value.email,
      phone: this.form.value.phone,
      about: this.form.value.about || null,
      skills: this.form.value.skills || null,
      date: new Date(),
    }
    this.submitted = true;
    this.formService.createNewDataFromForm(dataFromForm).pipe(takeUntil(this.destroyNotifier)).subscribe({
      next: () => {
        this.router.navigate(['form-result']);
        this.openSnackBar(SnackBarTypes.Success, 'Данные успешно отправлены');
        this.form.reset();
        this.submitted = false;
      },
      error: () => {
        this.openSnackBar(SnackBarTypes.Error, `Ошибка. Не удалось отправить данные`);
        this.form.reset();
        this.submitted = false;
      }
    });
  }

  public isShowAbout(): boolean {
    return this.isAbout = !this.isAbout;
  }

  public addSkills(): void {
    const skill: any = new UntypedFormGroup({
      skill: new UntypedFormControl(''),
      // skill: new UntypedFormControl(''),
    });
    (this.form.get('skills') as UntypedFormArray).push(skill);
  }

  public detectBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }
  public detectBrowserVersion(){
      let userAgent = navigator.userAgent, tem,
      matchTest = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

      if (/trident/i.test(matchTest[1])) {
          tem =  /\brv[ :]+(\d+)/g.exec(userAgent) || [];
          return 'IE '+(tem[1] || '');
      }
      if (matchTest[1]=== 'Chrome') {
          tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
          if (tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
      matchTest= matchTest[2] ? [matchTest[1], matchTest[2]] : [navigator.appName, navigator.appVersion, '-?'];
      if ((tem= userAgent.match(/version\/(\d+)/i))!= null) matchTest.splice(1, 1, tem[1]);
      return matchTest.join(' ');
  }

  private openSnackBar(actionType: string, message: string): void {
    this.snackBarService.openSnackBar({
      actionType,
      message,
    })
  }
}
