import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { FbCreateResponse } from "src/app/admin/shared/interfaces/fbCreateResponse";
import { environment } from "../../../../environments/environment";

const environments = environment.fbDbUrl
@Injectable()
export class CoordinatesService {
  public coordinates$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(
    private http: HttpClient,
  ) {}

  public sendGeometryPolygon(coordinates: any): Observable<any> {
    console.log(`sendGeometryPolygon :`, coordinates);
    return this.http.post<any>(`${environments}/coordinates.json`, coordinates);
  }

  public getGeometryPolygon(): Observable<any> {
    return this.http.get<any>(`${environments}/coordinates.json`)
    .pipe(
      map((response: {[key: string]: any}) => {
        return Object.keys(response).map(key => ({
          ...response[key]
        }))
      })
    );;
  }
}
