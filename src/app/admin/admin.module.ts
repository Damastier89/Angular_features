import { RouterModule } from '@angular/router';
import { CreateArticlesComponent } from './create-articles/create-articles.component';
import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from "ngx-quill";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { AuthenticatedPageComponent } from './authenticated-page/authenticated-page.component';
import { AuthGuard } from './shared/services/auth.guarrd';
import { DashboardArticleComponent } from './dashboard-article/dashboard-article.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { EditArticlesComponent } from './edit-articles/edit-articles.component';

@NgModule({
  declarations: [
    CreateArticlesComponent,
    EditArticlesComponent,
    AdminLayoutComponent,
    AuthenticatedPageComponent,
    DashboardArticleComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    QuillModule.forRoot(),
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
          { path: 'authenticated-page', component: AuthenticatedPageComponent },
          { path: 'create-article', component: CreateArticlesComponent, canActivate: [AuthGuard] },
          { path: 'dashboard', component: DashboardArticleComponent, canActivate: [AuthGuard] },
          { path: 'article/:id/edit', component: EditArticlesComponent, canActivate: [AuthGuard]}
        ]
      }
    ]),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AdminModule { }
