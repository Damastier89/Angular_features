import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TitleComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    TitleComponent,
  ]
})
export class TitleModule { }
