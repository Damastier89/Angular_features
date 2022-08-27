import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { FbCreateResponse } from "../../../admin/shared/interfaces/fbCreateResponse";
import { environment } from "../../../../environments/environment";
import { DataForm } from "../interfaces/formData";

const environments = environment.fbDbUrl

@Injectable()
export class FormService {

  constructor(private http: HttpClient) {}

  public createNewDataFromForm(data: DataForm): Observable<DataForm> {
    return this.http.post<any>(`${environments}/data.json`, data)
      .pipe(
        map((response: FbCreateResponse) => {
          return {
            ...data,
            id: response.name,
            date: new Date(data.date)
          }
        })
      );
  }
}
