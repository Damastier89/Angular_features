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
import { SearchArticlesPipe } from './shared/pipe/searchArticles.pipe';

import ru from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { MapModule } from './map/map.module';
import { FormsModule } from '@angular/forms';
import { TitleModule } from './shared/components/title/title.module';
import { ArticlesModule } from './article/articles.module';
import { DrawIconService } from './map/open-layer/services/draw-icon.service';
registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TimerComponent,
    ConfirmComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    MapModule,
    TitleModule,
    ArticlesModule,
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
