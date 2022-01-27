import { MainPageComponent } from './shared/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewChildComponent } from './sections/view-child/view-child.component';
import { DependencyInjectionComponent } from './sections/dependency-injection/dependency-injection.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'view-child', component: ViewChildComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
