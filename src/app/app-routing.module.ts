import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './shared/authentication/sing-in/sign-in.component';
import { SignUpComponent } from './shared/authentication/sing-up/sign-up.component';
import { ForgotPasswordComponent } from './shared/authentication/forgot-password/forgot-password.component';
import { AuthenticationGuard } from './shared/guard/authentication.guard';
import { CommonModule } from '@angular/common';
import { ErrorPageComponeent } from './shared/components/error/error-page';

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent },
  {path: 'main-page', component: MainPageComponent, canActivate: [AuthenticationGuard]},
  {
    path: 'all_articles', 
    loadChildren: () => import('./article/articles.module').then(module => module.ArticlesModule), 
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'map', 
    loadChildren: () => import('./map/map.module').then(module => module.MapModule), 
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule), 
    canActivate: [AuthenticationGuard]},
  {
    path: 'graphics', 
    loadChildren: () => import('./graphics/graphics.module').then(module => module.GraphicsModule), 
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'angular-features', 
    loadChildren: () => import('./angular-features/angular-features.module').then(module => module.AngularFeaturesModule), 
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'model3D', 
    loadChildren: () => import('./model3D/model3D.module').then(module => module.Model3DModule), 
    canActivate: [AuthenticationGuard]
  },
  {path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {path: 'error-page', component: ErrorPageComponeent},
  {path: '**', redirectTo: '/error-page'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
