import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TitleModule } from '../shared/components/title/title.module';
import { AngularFeaturesComponent } from './angular-features.component';
import { AngularFormsComponent } from './forms/angular-forms/angular-forms.component';
import { AngularTabsComponent } from './tabs/angular-tabs.component';
import { AngularModalsComponent } from './modals/angular-modals.component';
import { DialogComponent } from './modals/dialog/dialog.component';

@NgModule({
  declarations: [
    AngularFeaturesComponent,
    AngularFormsComponent,
    AngularTabsComponent,
    AngularModalsComponent,
    DialogComponent,
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
    MatDialogModule,
    DragDropModule,
    RouterModule.forChild([
      {
        path: '', component: AngularFeaturesComponent, children: [
          { path: '', redirectTo: 'forms', pathMatch: 'full'},
          { path: 'forms', component: AngularFormsComponent },
          { path: 'tabs', component: AngularTabsComponent },
          { path: 'modals', component: AngularModalsComponent },
        ]
      }
    ]),
  ]
})

export class AngularFeatures {}
