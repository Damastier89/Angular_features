import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { referenceProviders } from './open-layer/tokens/reference.token';
import { MapComponent } from './map.component';
import { RouterModule } from '@angular/router';
import { TitleModule } from '../shared/components/title/title.module';
import { DrawIconService } from './open-layer/services/draw-icon.service';
import { PropertiesComponent } from './map-properties/properties/properties.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CoordinatesComponent } from './map-coordinates/coordinates/coordinates.component';
import { CoordinatesService } from './open-layer/services/coordinate.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatRadioModule} from "@angular/material/radio";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
	declarations: [MapComponent, PropertiesComponent, CoordinatesComponent],
	imports: [
		CommonModule,
		TitleModule,
		MatTabsModule,
		FormsModule,
		ReactiveFormsModule,
		DragDropModule,
		RouterModule.forChild([{path: '', component: MapComponent}]),
		MatRadioModule,
		MatExpansionModule,
		MatMenuModule,
		MatTooltipModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
	exports: [RouterModule],
	providers: [DrawIconService, referenceProviders, CoordinatesService],
})
export class MapModule {}
