import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, Subject } from 'rxjs';

import { SnackBarTypes } from 'src/app/shared/_models/snack-bar-types.enum';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { FileData } from '../shared/interfaces/files.interface';
import { FBStorageService, FileUpload } from '../shared/storage/fb-storage.service';


@Component({
  selector: 'app-loading-data',
  templateUrl: './loading-data.component.html',
  styleUrls: ['./loading-data.component.scss']
})
export class LoadingDataComponent implements OnInit, OnDestroy {
  public selectedFiles?: FileList;
  public currentFileUpload?: FileUpload;
  public percentage = 0;

  fileUploads?: any[];

  private destroyNotifier: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fbStorageService: FBStorageService,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.fbStorageService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next(true);
    this.destroyNotifier.complete();
  }

  public selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.openSnackBar(SnackBarTypes.Success, `Файл ${event.target.files[0].name} загружен успешно`);
  }

  public uploadFile(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.fbStorageService.pushFileToStorage(this.currentFileUpload).subscribe({
          next: percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error: error => {
            console.log(error);
          }
        });
      }
    }
  }

  // public uploadFile(event: any): void {
  //   const file = event.target.files[0];
  //   this.fbStorageService.pushFileToStorage(file);
  //   this.openSnackBar(SnackBarTypes.Success, `Файл ${file.name} загружен успешно`);
  // }

  private openSnackBar(actionType: string, message: string): void {
    this.snackBarService.openSnackBar({
      actionType,
      message,
    })
  }

}
