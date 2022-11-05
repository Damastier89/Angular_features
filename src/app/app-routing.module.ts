import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './shared/authentication/sing-in/sign-in.component';
import { SignUpComponent } from './shared/authentication/sing-up/sign-up.component';
import { ForgotPasswordComponent } from './shared/authentication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './shared/authentication/verify-email/verify-email.component';
import { AuthenticationGuard } from './shared/guard/authentication.guard';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'all_articles', loadChildren: () => import('./article/articles.module').then(module => module.ArticlesModule)},
  {path: 'map', loadChildren: () => import('./map/map.module').then(module => module.MapModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)},
  {path: 'graphics', loadChildren: () => import('./graphics/graphics.module').then(module => module.GraphicsModule)},
  {path: 'angular-features', loadChildren: () => import('./angular-features/angular-features.module').then(module => module.AngularFeaturesModule)},
  {path: 'model3D', loadChildren: () => import('./model3D/model3D.module').then(module => module.Model3DModule)},
];

// const routes: Routes = [
//   { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
//   { path: 'sign-in', component: SignInComponent },
//   { path: 'register-user', component: SignUpComponent },
//   { path: 'dashboard', component: MainPageComponent, canActivate: [AuthenticationGuard] },
//   { path: 'forgot-password', component: ForgotPasswordComponent },
//   { path: 'verify-email-address', component: VerifyEmailComponent },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
