import { Injectable } from "@angular/core";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FileData } from "../interfaces/files.interface";
import { finalize, Observable } from "rxjs";
import { Data } from "@angular/router";

@Injectable()
export class FBStorageService {
  private basePath: string = '/uploads';

  constructor(
    private storage: AngularFireStorage,
    private dataBase: AngularFireDatabase,
  ) {}

  public pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  public getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.dataBase.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  public deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.dataBase.list(this.basePath).push(fileUpload);
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.dataBase.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

}

export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  date!: Data;
  file: File;

  constructor(file: File, date: any) {
    this.file = file;
    this.date = date;
  }
}

// "auth != null"
// https://www.bezkoder.com/angular-14-firebase-storage/