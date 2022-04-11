import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { referenceProviders } from './open-layer/tokens/reference.token';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    referenceProviders,
  ]
})
export class MapModule { }
