import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../../environments/environment';

const environments = environment.fbDbUrl;
@Injectable({
  providedIn: 'root'
})
export class ChangeThemesService {
  public changeThemes: BehaviorSubject<string> = new BehaviorSubject<string>('default');

  constructor() { }

}
