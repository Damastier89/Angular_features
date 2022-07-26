import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ConfirmComponent } from './shared/_models/confirm/confirm.component';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { TimerComponent } from './shared/components/timer/timer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import ru from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { MapModule } from './map/map.module';
import { FormsModule } from '@angular/forms';
import { TitleModule } from './shared/components/title/title.module';
import { ArticlesModule } from './article/articles.module';
import { ArticleService } from './admin/shared/services/article.service';
import { GraphicsModule } from './graphics/graphics.module';
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
    GraphicsModule,
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
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ArticleService) => () => configService.load(),
      deps:[ArticleService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
