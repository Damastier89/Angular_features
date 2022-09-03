import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject } from "rxjs";

@Injectable()
export class CoordinatesService {
  public coordinates$: BehaviorSubject<string> = new BehaviorSubject<string>('');
}
