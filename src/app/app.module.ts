import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { MatIconModule } from '@angular/material/icon';

import { StoreModule } from '@ngrx/store';

import { ConfirmComponent } from './shared/_models/confirm/confirm.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { TimerComponent } from './shared/components/timer/timer.component';
import { MapModule } from './map/map.module';
import { TitleModule } from './shared/components/title/title.module';
import { ArticlesModule } from './article/articles.module';
import { GraphicsModule } from './graphics/graphics.module';
import { AngularFeaturesModule } from './angular-features/angular-features.module';
import { Model3DModule } from './model3D/model3D.module';
import { AuthenticationService } from './shared/services/authentication.service';
import { SignInComponent } from './shared/authentication/sing-in/sign-in.component';
import { ErrorPageComponeent } from './shared/components/error/error-page';
import { SignUpComponent } from './shared/authentication/sing-up/sign-up.component';
registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TimerComponent,
    ConfirmComponent,
    SignInComponent,
    SignUpComponent,
    ErrorPageComponeent,
  ],
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
    StoreModule.forRoot({})
  ],
  exports: [],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: "ru-RU",
    },
    // В моем случае APP_INITIALIZER и DataService дают двойную подписку
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (configService: ArticleService) => () => configService.load(),
    //   deps:[ArticleService],
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
