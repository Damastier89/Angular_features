import { Component, Input, OnInit } from '@angular/core';
import { ChangeThemesService } from '../../services/change-themes.service';

@Component({
	selector: 'app-title',
	templateUrl: './title.component.html',
	styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
	@Input() public title!: string;

	public currentThemes: string | null = '';

	public theme = localStorage.getItem('nameThemes');

	constructor(private changeThemesService: ChangeThemesService) {}

	ngOnInit(): void {
		this.setDefaultThemes();
		this.getCurrentThemes();
		this.getThemesFromStorage();
	}

	public getCurrentThemes(): void {
		this.changeThemesService.changeThemes.subscribe((res) => {
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
