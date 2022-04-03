import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ConfirmComponent } from './shared/_models/confirm/confirm.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { TimerComponent } from './shared/components/timer/timer.component';
import { AllArticlesComponent } from './article/all-articles/all-articles.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArticlePageComponent } from './article/article-page/article-page.component';
import { ArticleContentPageComponent } from './article/article-content-page/article-content-page.component';
import { TitleComponent } from './shared/components/title/title.component';
import { MapComponent } from './map/map.component';

import ru from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TimerComponent,
    AllArticlesComponent,
    ArticlePageComponent,  
    ConfirmComponent, 
    ArticleContentPageComponent, 
    TitleComponent, 
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: "ru-RU",
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
