import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

import { TitleModule } from '../shared/components/title/title.module';
import { AngularFeaturesComponent } from './angular-features.component';
import { AngularFormsComponent } from './forms/angular-forms/angular-forms.component';

@NgModule({
  declarations: [
    AngularFeaturesComponent,
    AngularFormsComponent,
  ],
  imports: [
    CommonModule,
    TitleModule,
    RouterModule.forChild([
      { path: '', component: AngularFeaturesComponent }
    ]),
    MatTabsModule,
  ]
})

export class AngularFeatures {}
