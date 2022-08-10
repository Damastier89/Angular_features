import { Component, Input, OnInit } from '@angular/core';
import { ChangeThemesService } from '../../services/change-themes.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() public title!: string;
  public currentThemes: string | null = '';
  public theme = localStorage.getItem('nameThemes');

  constructor(
    private changeThemesService: ChangeThemesService,
  ) { }

  ngOnInit(): void {
    this.getCurrentThemes();
    this.currentThemes = this.theme;
  }

  public getCurrentThemes(): void {
    this.changeThemesService.changeThemes.subscribe(res => {
      this.currentThemes = res;
    })
  }

}
