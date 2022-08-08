import { Component, Input, OnInit } from '@angular/core';
import { ChangeThemesService } from '../../services/change-themes.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() public title!: string;
  public currentThemes!: number;

  constructor(
    private changeThemesService: ChangeThemesService,
  ) { }

  ngOnInit(): void {
    this.getCurrentThemes();
  }

  public getCurrentThemes(): void {
    this.changeThemesService.changeThemes.subscribe(res => {
      this.currentThemes = res;
    })
  }

}
