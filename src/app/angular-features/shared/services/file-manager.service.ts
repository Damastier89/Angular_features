import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const environments = environment.fbDbUrl;

@Injectable()
export class FileManagerService {

  constructor(
    private http: HttpClient,
  ) {}

  public uploadFileToDataBase(file: any): Observable<any> {
    const headers = new HttpHeaders({
      'Accept' : '*/*'
    });
    return this.http.post<any>(`${environments}/upload-file.json`, file, {headers});
  }

  public downloadFileFromDataBase() {}
}