import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { SnackBarService } from '../../shared/services/snack-bar.service';
import { SnackBarTypes } from '../../shared/_models/snack-bar-types.enum';
import { FileManagerService } from '../shared/services/file-manager.service';

@Component({
  selector: 'app-loading-data',
  templateUrl: './loading-data.component.html',
  styleUrls: ['./loading-data.component.scss']
})
export class LoadingDataComponent implements OnInit, OnDestroy {

  private destroyNotifier: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fileManager: FileManagerService,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyNotifier.next(true);
    this.destroyNotifier.complete();
  }

  public uploadFile(event: any): void {
    const file = (event.target.files[0]);
    console.log(`file`, file);
    let formData = new FormData();

    formData.append('description', 'Файл загруженный с ПК');
    formData.append('file', file);

    console.log(`formData`, formData);

    const test = {
      name: 'Elena',
      file: file,
    }

    this.fileManager.uploadFileToDataBase(test).pipe(
      takeUntil(this.destroyNotifier)
    ).subscribe({
      next: (file) => {
        console.log('uploadFile', file)
        this.openSnackBar(SnackBarTypes.Success, 'Файл успешно загружен')
      },
      error: (error: HttpErrorResponse) => {
        this.openSnackBar(SnackBarTypes.Error, `Не удалось загрузить файл : ${error.status}`)
      }
    });
  }

  private openSnackBar(actionType: string, message: string): void {
    this.snackBarService.openSnackBar({
      actionType,
      message,
    })
  }

}
