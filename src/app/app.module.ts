import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './shared/main-page/main-page.component';
import { TimerComponent } from './timer/timer.component';
import { WelcomePageComponent } from './shared/welcome-page/welcome-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TimerComponent,
    WelcomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
