import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CreateArticlesComponent } from './create-articles/create-articles.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { AuthenticatedPageComponent } from './authenticated-page/authenticated-page.component';
import { AuthGuard } from './shared/services/auth.guard';
import { DashboardArticleComponent } from './dashboard-article/dashboard-article.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { EditArticlesComponent } from './edit-articles/edit-articles.component';
import { adminReducer } from './shared/store/reducers/reducers';
import { AdminEffect } from './shared/store/effects/admin.effect';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
            { path: 'authenticated-page', component: AuthenticatedPageComponent },
            { path: 'create-article', component: CreateArticlesComponent, canActivate: [AuthGuard] },
            { path: 'dashboard', component: DashboardArticleComponent, canActivate: [AuthGuard] },
            { path: 'article/:id/edit', component: EditArticlesComponent, canActivate: [AuthGuard] },
        ],
    },
];
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
        RouterModule.forChild(routes),
        StoreModule.forFeature('admin', adminReducer),
        EffectsModule.forFeature([AdminEffect]),
    ],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class AdminModule {}
