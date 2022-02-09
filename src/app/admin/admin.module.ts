import { RouterModule } from '@angular/router';
import { CreateArticlesComponent } from './create-articles/create-articles.component';
import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';

@NgModule({
  declarations: [
    CreateArticlesComponent,
    AdminLayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '', pathMatch: 'full' },
          { path: 'create-article', component: CreateArticlesComponent },
        ]
      }
    ]),
  ]
})
export class AdminModule { }
