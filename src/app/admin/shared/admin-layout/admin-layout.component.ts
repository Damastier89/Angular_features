import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';
import { ChangeThemesService } from '../../../shared/services/change-themes.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-admin-layout',
	templateUrl: './admin-layout.component.html',
	styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
	public currentThemes: string | null = '';

	public theme = localStorage.getItem('nameThemes');

	private destroyNotifier: Subject<boolean> = new Subject<boolean>();

	constructor(public auth: AuthService, private router: Router, private changeThemesService: ChangeThemesService) {}

	ngOnInit(): void {
		this.setDefaultThemes();
		this.getCurrentThemes();
		this.getThemesFromStorage();
	}

	ngOnDestroy(): void {
		this.destroyNotifier.next(true);
		this.destroyNotifier.complete();
	}

	public logout(event: Event): void {
		event.preventDefault();
		this.auth.logout();
		this.router.navigate(['/admin', 'authenticated-page']);
	}

	public getCurrentThemes(): void {
		this.changeThemesService.changeThemes.pipe(takeUntil(this.destroyNotifier)).subscribe((res) => {
			this.currentThemes = res;
		});
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
}
