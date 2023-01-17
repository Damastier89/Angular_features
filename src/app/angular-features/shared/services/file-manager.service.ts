import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const environments = environment.fbDbUrl;

// Сервис пока не используется
@Injectable()
export class FileManagerService {
  constructor(private http: HttpClient) {}

  public uploadFileToDataBase(file: any): Observable<any> {
    const headers = new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'form/multipart',
    });
    return this.http.post<any>(`${environments}/upload-file.json`, file, { headers });
  }

  public downloadFileFromDataBase() {}
}
