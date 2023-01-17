import { Observable, interval, startWith, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ChangeThemesService } from '../../services/change-themes.service';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { EmployeeDataService } from '../../services/employeeData.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public emoj: string = '☣';

  public employeeName: string = 'Ehooooo';

  public currentThemes: string | null = '';

  public theme = localStorage.getItem('nameThemes');

  constructor(
    private changeThemesService: ChangeThemesService,
    private authService: AuthenticationService,
    private employeeDataService: EmployeeDataService,
  ) {}

  ngOnInit(): void {
    this.setNameCurrentUser();
    this.setDefaultThemes();
    this.getCurrentThemes();
    this.getThemesFromStorage();
  }

  public actualDate: Observable<string> = interval(1000).pipe(
    startWith(new Date()),
    map(() => new Date().toString()),
  );

  public logout() {
    this.authService.signOut();
  }

  public getCurrentThemes(): void {
    this.changeThemesService.changeThemes.subscribe((res) => {
      this.currentThemes = res;
    });
  }

  public changeThemes(nameThemes: string): void {
    this.changeThemesService.changeThemes.next(nameThemes);
    localStorage.setItem('nameThemes', nameThemes);
  }

  private setDefaultThemes(): void {
    if (this.currentThemes === null && localStorage.length === 0) {
      this.currentThemes = 'default';
    }
  }

  private getThemesFromStorage(): void {
    if (this.theme === null) {
      this.currentThemes = 'default';
    } else {
      this.currentThemes = this.theme;
    }
  }

  private setNameCurrentUser(): void {
    this.employeeName = this.employeeDataService.getNameCurrentUser();
  }
}
