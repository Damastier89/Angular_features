import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { MatMenuModule } from '@angular/material/menu';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { StoreModule } from '@ngrx/store';

import { TitleModule } from '../shared/components/title/title.module';
import { AngularFeaturesComponent } from './angular-features.component';
import { AngularFormsComponent } from './form/angular-forms/angular-forms.component';
import { AngularModalsComponent } from './modals/angular-modals.component';
import { DialogComponent } from './modals/dialog/dialog.component';
import { CheckNegativeNumberDirective } from './shared/directives/checkNegatineNumber.directive';
import { CheckAllLettersDirective } from './shared/directives/checkAllLetters.directive';
import { CheckNumbersDirective } from './shared/directives/checkNumbers.directive';
import { CheckSpecialCharactersDirective } from './shared/directives/chekcSpecialСharacters.directive';
import { NgxMaskModule } from 'ngx-mask';
import { FeedbackFormService } from './shared/services/feedbackForm.service';
import { AutocompleteOffDirective } from './directives/autocompliteOff.directive';
import { FormResultComponent } from './form-result/form-result/form-result.component';
import { LoadingDataComponent } from './loading-data/loading-data.component';
import { FileManagerService } from './shared/services/file-manager.service';
import { FIREBASE_CONFIG } from '../shared/fb-config/firebase-config';
import { FBStorageService } from './shared/storage/fb-storage.service';
import { LoadingDataDetailsComponent } from './loading-data-details/loading-data-details.component';
import { feedbackReducer } from './shared/store/reducers/reducers';
import { FeedbackEffect } from './shared/store/effects/feedback.effect';
import { EffectsModule } from '@ngrx/effects';
import { HttpErrorMassageComponent } from './shared/components/http-error-massage/http-error-massage.component';
import { SelectComponent } from './select/select.component';
import {MatSelectModule} from "@angular/material/select";

const routes: Routes = [
	{
		path: '',
		component: AngularFeaturesComponent,
		children: [
			{ path: '', redirectTo: 'forms', pathMatch: 'full' },
			{ path: 'forms', component: AngularFormsComponent },
			{ path: 'form-result', component: FormResultComponent },
			{ path: 'modals', component: AngularModalsComponent },
			{ path: 'loading-data', component: LoadingDataComponent },
			{ path: 'select', component: SelectComponent }
		],
	},
];

@NgModule({
	declarations: [
		AngularFeaturesComponent,
		AngularFormsComponent,
		AngularModalsComponent,
		DialogComponent,
		CheckNegativeNumberDirective,
		CheckAllLettersDirective,
		CheckNumbersDirective,
		CheckSpecialCharactersDirective,
		AutocompleteOffDirective,
		FormResultComponent,
		LoadingDataComponent,
		LoadingDataDetailsComponent,
		HttpErrorMassageComponent,
		SelectComponent,
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
        MatMenuModule,
        NgxMaskModule.forRoot(),
        RouterModule.forChild(routes),
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        StoreModule.forFeature('feedback', feedbackReducer),
        EffectsModule.forFeature([FeedbackEffect]),
        MatSelectModule,
    ],
	exports: [HttpErrorMassageComponent],
	providers: [FeedbackFormService, FileManagerService, FBStorageService],
})
export class AngularFeaturesModule {}

// https://www.positronx.io/full-angular-firebase-authentication-system/
