import { Component } from '@angular/core';
import { Tile } from '../shared/interfaces/tile';

@Component({
	selector: 'app-angular-features',
	templateUrl: './angular-features.component.html',
	styleUrls: ['./angular-features.component.scss'],
})
export class AngularFeaturesComponent {
	public angularFeatures: string = 'Ангуляр';

	constructor() {}
}
