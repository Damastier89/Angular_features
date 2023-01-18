import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { referenceProviders } from './open-layer/tokens/reference.token';
import { MapComponent } from './map.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { TitleModule } from '../shared/components/title/title.module';
import { DrawIconService } from './open-layer/services/draw-icon.service';
import { PropertiesComponent } from './map-properties/properties/properties.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CoordinatesComponent } from './map-coordinates/coordinates/coordinates.component';
import { CoordinatesService } from './open-layer/services/coordinate.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [MapComponent, PropertiesComponent, CoordinatesComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TitleModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
        RouterModule.forChild([{ path: '', component: MapComponent }]),
    ],
    exports: [RouterModule],
    providers: [DrawIconService, referenceProviders, CoordinatesService],
})
export class MapModule {}
