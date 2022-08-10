import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

import { TitleModule } from '../shared/components/title/title.module';
import { AngularFeaturesComponent } from './angular-features.component';
import { AngularFormsComponent } from './forms/angular-forms/angular-forms.component';
import { AngularTabsComponent } from './tabs/angular-tabs.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AngularFeaturesComponent,
    AngularFormsComponent,
    AngularTabsComponent,
  ],
  imports: [
    CommonModule,
    TitleModule,
    MatTabsModule,
    MatButtonModule,
    RouterModule.forChild([
      { 
        path: '', component: AngularFeaturesComponent, children: [
          { path: 'forms', component: AngularFormsComponent },
          { path: 'tabs', component: AngularTabsComponent },
        ] 
      }
    ]),
  ]
})

export class AngularFeatures {}
