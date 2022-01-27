import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './shared/main-page/main-page.component';
import { TimerComponent } from './shared/timer/timer.component';
import { ViewChildComponent } from './sections/view-child/view-child.component';
import { DependencyInjectionComponent } from './sections/dependency-injection/dependency-injection.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TimerComponent,
    ViewChildComponent,
    DependencyInjectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
