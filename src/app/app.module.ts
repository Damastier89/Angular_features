import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { MatIconModule } from '@angular/material/icon';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ConfirmComponent } from './shared/_models/confirm/confirm.component';
import { AppComponent } from './app.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { ErrorPageComponent } from './shared/components/error/error-page';
import { TimerComponent } from './shared/components/timer/timer.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { MapModule } from './map/map.module';
import { TitleModule } from './shared/components/title/title.module';
import { ArticlesModule } from './article/articles.module';
import { GraphicsModule } from './graphics/graphics.module';
import { AngularFeaturesModule } from './angular-features/angular-features.module';
import { Model3DModule } from './model3D/model3D.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { environment } from '../environments/environment.prod';
import { CanvasModule } from './canvas/canvas.module';
registerLocaleData(ru);

@NgModule({
	declarations: [AppComponent, MainPageComponent, TimerComponent, ConfirmComponent, ErrorPageComponent],
	imports: [
		FormsModule,
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		SharedModule,
		MaterialModule,
		MapModule,
		TitleModule,
		ArticlesModule,
		GraphicsModule,
		MatIconModule,
		AngularFeaturesModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		Model3DModule,
		AuthenticationModule,
		CanvasModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({
			maxAge: 25, // Сохраняет последние 25 состояний
			logOnly: environment.production,
			autoPause: true, // Приостанавливает действия записи и изменения состояния, когда окно расширения не открыто
		}),
	],
	exports: [],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		{
			provide: LOCALE_ID,
			useValue: 'ru-RU',
		},
		// В моем случае APP_INITIALIZER и DataService дают двойную подписку
		// {
		//   provide: APP_INITIALIZER,
		//   useFactory: (configService: ArticleService) => () => configService.load(),
		//   deps:[ArticleService],
		//   multi: true
		// }
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
