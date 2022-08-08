import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-features',
  templateUrl: './angular-features.component.html',
  styleUrls: ['./angular-features.component.scss']
})
export class AngularFeaturesComponent implements OnInit {

  public angularFeatures: string = 'Ангуляр фичи';

  constructor() { }

  ngOnInit(): void {
  }

}
