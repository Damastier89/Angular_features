import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { getStorage, ref } from "firebase/storage";

import { FbCreateResponse } from "../../../admin/shared/interfaces/fbCreateResponse";
import { environment } from "../../../../environments/environment";

const environments = environment.fbDbUrl;

@Injectable()
export class FileManagerService {

  constructor(
    private http: HttpClient,
  ) {}

  public uploadFileToDataBase(file: any): Observable<any> {
    console.log(`file`, file);
    const headers = new HttpHeaders({ 
      // 'Accept' : '*/*',
      // 'Content-Type' : 'form/multipart',
    });
    // const files = JSON.stringify(file);
    return this.http.post<any>(`${environments}/upload-file.json`, file, {headers})
      // .pipe(
      //   map((response: FbCreateResponse) => {
      //     return {
      //       ...file,
      //       id: response.name,
      //       date: new Date(file.date)
      //     }
      //   })
      // );
  }

  public downloadFileFromDataBase() {}
}


// rules_version = '2';
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if false;
//     }
//   }
// }