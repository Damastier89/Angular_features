import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { SnackBarTypes } from '../../../shared/_models/snack-bar-types.enum';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { FeedbackFormService } from '../../shared/services/feedbackForm.service';

@Component({
  selector: 'app-form-result',
  templateUrl: './form-result.component.html',
  styleUrls: ['./form-result.component.scss'],
})
export class FormResultComponent implements OnInit, OnDestroy {
  public dataFromForm!: any;

  public agePerson!: string;

  public skillPerson!: any[];

  private destroyNotifier: Subject<boolean> = new Subject<boolean>();

  constructor(
    private feedbackFormService: FeedbackFormService,
    private snackBarService: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.feedbackFormService
      .getAllDataForm()
      .pipe(takeUntil(this.destroyNotifier))
      .subscribe((data: any) => {
        if (data) {
          this.dataFromForm = data.pop();
          this.checkAgePerson(Number(this.dataFromForm.age));
          this.skillPerson = this.dataFromForm.skills;
        } else {
          this.openSnackBar(SnackBarTypes.Error, 'Не удалось получить данные формы');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next(true);
    this.destroyNotifier.complete();
  }

  public checkAgePerson(age: number): any {
    if (age <= 20 || age >= 25) {
      this.agePerson = 'лет';
    } else if (age == 21 || age == 31) {
      this.agePerson = 'год';
    } else if (age >= 22 || age <= 24) {
      this.agePerson = 'года';
    }
  }

  private openSnackBar(actionType: string, message: string): void {
    this.snackBarService.openSnackBar({
      actionType,
      message,
    });
  }
}
