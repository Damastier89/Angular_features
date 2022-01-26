import { MainPageComponent } from './shared/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './shared/welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '', component: MainPageComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: WelcomePageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
