import { Observable, interval, startWith, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeThemesService } from '../../services/change-themes.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public emoj: string = "☣"
  public currentThemes!: number;

  constructor(
    private router: Router,
    private changeThemesService: ChangeThemesService,
  ) { }

  ngOnInit(): void {
    this.changeThemesService.changeThemes.subscribe(res => {
      this.currentThemes = res;
    });
  }

  public actualDate: Observable<string> = interval(1000)
    .pipe(
      startWith(new Date()),
      map(() => new Date().toString())
      );

  public changeThemesDefault(): void {
    this.changeThemesService.changeThemes.next(1);
  }

  public changeThemesMilitant(): void {
    this.changeThemesService.changeThemes.next(2);
  }

  public changeThemesTraning(): void {
    this.changeThemesService.changeThemes.next(3);
  }
}
