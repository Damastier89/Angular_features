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
    return this.http.post<any>(`${environments}/data-form.json`, data)
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

  public getAllDataForm(): Observable<DataForm[]> {
    return  this.http.get<DataForm>(`${environments}/data-form.json`)
      .pipe(
        map((response: {[key: string]: any}) => {
          return Object.keys(response).map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
        })
      );
  }
}
