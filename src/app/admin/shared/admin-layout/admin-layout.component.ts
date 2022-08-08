import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';
import { ChangeThemesService } from '../../../shared/services/change-themes.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  public currentThemes!: number;

  constructor(
    public auth: AuthService,
    private router: Router,
    private changeThemesService: ChangeThemesService,
  ) { }

  ngOnInit(): void {
    this.changeThemesService.changeThemes.subscribe(res => {
      this.currentThemes = res;
    });
  }

  public logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'authenticated-page']);
  }

}
