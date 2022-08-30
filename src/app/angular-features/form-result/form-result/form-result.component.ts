import { Component, OnDestroy, OnInit } from '@angular/core';
import { last, Subject, takeLast, takeUntil, tap } from 'rxjs';

import { SnackBarTypes } from '../../../shared/_models/snack-bar-types.enum';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { DataForm } from '../../shared/interfaces/formData';
import { FormService } from '../../shared/services/form.service';

@Component({
  selector: 'app-form-result',
  templateUrl: './form-result.component.html',
  styleUrls: ['./form-result.component.scss']
})
export class FormResultComponent implements OnInit, OnDestroy {
  public dataFromForm!: DataForm | undefined;
  private destroyNotifier: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formService: FormService,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.formService.getAllDataForm().pipe(
      takeUntil(this.destroyNotifier)
    ).subscribe((data: DataForm[]) => {
      console.log(data)
      if (data) {
        this.dataFromForm = data.pop();
      } else {
        this.openSnackBar(SnackBarTypes.Error, 'Не удалось получить данные формы')
      }

    })
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next(true);
    this.destroyNotifier.complete();
  }

  private openSnackBar(actionType: string, message: string): void {
    this.snackBarService.openSnackBar({
      actionType,
      message,
    })
  }

}
