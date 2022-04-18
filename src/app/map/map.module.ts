import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { referenceProviders } from './open-layer/tokens/reference.token';
import { MapComponent } from './map.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { TitleModule } from '../shared/components/title/title.module';
import { DrawIconService } from './open-layer/services/draw-icon.service';

@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TitleModule,
    RouterModule.forChild([
      { path: '', component: MapComponent }
    ]),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    DrawIconService,
    referenceProviders,
  ]
})
export class MapModule { }
