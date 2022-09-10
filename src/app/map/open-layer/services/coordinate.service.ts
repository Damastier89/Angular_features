import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { FbCreateResponse } from "src/app/admin/shared/interfaces/fbCreateResponse";
import { environment } from "../../../../environments/environment";

const environments = environment.fbDbUrl
@Injectable()
export class CoordinatesService {
  // В BehaviorSubject нет необходимости, так как есть mapRefService
  // в котором хранится ссылка на карту
  // public coordinates$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  public isPolygons: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // -NBWrnpT2Ktx_tlL--Q-

  constructor(
    private http: HttpClient,
  ) {}

  public sendGeometryPolygon(coordinates: any): Observable<any> {
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

  public removePolygon(): Observable<void> {
    return this.http.delete<void>(`${environments}/coordinates/-NBWrnpT2Ktx_tlL--Q-.json`);
  }
}
