import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeThemesService {
  public changeThemes: BehaviorSubject<any> = new BehaviorSubject<any>(1);

  constructor() { }
}
