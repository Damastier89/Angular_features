import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TitleModule } from '../shared/components/title/title.module';
import { AngularFeaturesComponent } from './angular-features.component';
import { AngularFormsComponent } from './forms/angular-forms/angular-forms.component';
import { AngularTabsComponent } from './tabs/angular-tabs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

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
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path: '', component: AngularFeaturesComponent, children: [
          { path: '', redirectTo: 'forms', pathMatch: 'full'},
          { path: 'forms', component: AngularFormsComponent },
          { path: 'tabs', component: AngularTabsComponent },
        ]
      }
    ]),
  ]
})

export class AngularFeatures {}
