import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

import { TitleModule } from '../shared/components/title/title.module';
import { AngularFeaturesComponent } from './angular-features.component';
import { AngularFormsComponent } from './form/angular-forms/angular-forms.component';
import { AngularModalsComponent } from './modals/angular-modals.component';
import { DialogComponent } from './modals/dialog/dialog.component';
import { CheckNegativeNumber } from './shared/directives/checkNegatineNumber.directive';
import { CheckAllLetters } from './shared/directives/checkAllLetters.directive';
import { CheckNumbers } from './shared/directives/checkNumbers.directive';
import { CheckSpecialCharacters } from './shared/directives/chekcSpecialСharacters.directive';
import { NgxMaskModule } from 'ngx-mask';
import { FormService } from './shared/services/form.service';
import { AutocompleteOffDirective } from './directives/autocompliteOff.directive';
import { FormResultComponent } from './form-result/form-result/form-result.component';
import { LoadingDataComponent } from './loading-data/loading-data.component';
import { FileManagerService } from './shared/services/file-manager.service';

@NgModule({
  declarations: [
    AngularFeaturesComponent,
    AngularFormsComponent,
    AngularModalsComponent,
    DialogComponent,
    CheckNegativeNumber,
    CheckAllLetters,
    CheckNumbers,
    CheckSpecialCharacters,
    AutocompleteOffDirective,
    FormResultComponent,
    LoadingDataComponent,
  ],
  imports: [
    CommonModule,
    TitleModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    TextFieldModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatCardModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild([
      {
        path: '', component: AngularFeaturesComponent, children: [
          { path: '', redirectTo: 'forms', pathMatch: 'full'},
          { path: 'forms', component: AngularFormsComponent },
          { path: 'form-result', component: FormResultComponent},
          { path: 'modals', component: AngularModalsComponent },
          { path: 'loading-data', component: LoadingDataComponent },
        ]
      }
    ]),
  ],
  providers: [
    FormService,
    FileManagerService,
  ]
})

export class AngularFeaturesModule {}
