import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
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
    return this.http.get<any>(`${environments}/coordinates.json`);
  }
}
