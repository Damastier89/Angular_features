import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ChangeThemesService {
	public changeThemes: BehaviorSubject<string> = new BehaviorSubject<string>('default');
}
