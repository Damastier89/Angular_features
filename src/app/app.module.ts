import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ConfirmComponent } from './shared/_models/confirm/confirm.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { TimerComponent } from './shared/components/timer/timer.component';
import { AllArticlesComponent } from './all-articles/all-articles.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArticleContentPageComponent } from './article-content-page/article-content-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TimerComponent,
    AllArticlesComponent,
    ArticlePageComponent,  
    ConfirmComponent, ArticleContentPageComponent,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
