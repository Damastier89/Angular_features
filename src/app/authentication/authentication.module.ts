import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { SignInComponent } from "./components/sing-in/sign-in.component";
import { SignUpComponent } from "./components/sing-up/sign-up.component";
import { AuthenticationService } from "./services/authentication.service";
import { RegisterEffect } from "./store/effects/register.effect";
import { authReducer } from "./store/reducers/redusers";

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sing-up', component: SignUpComponent },
  // { path: 'verify-email-address', component: VerifyEmailComponent },
];

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('authentication', authReducer)
  ],
  providers: [
    AuthenticationService,
    RegisterEffect,
  ]
})
export class AuthenticationModule {}