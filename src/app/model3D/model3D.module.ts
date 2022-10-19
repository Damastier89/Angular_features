import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TitleModule } from "../shared/components/title/title.module";
import { Model3dComponent } from "./model3D.component";

@NgModule({
  declarations: [
    Model3dComponent,
  ],
  imports: [
    CommonModule,
    TitleModule,
    RouterModule.forChild([
      {path: '', component: Model3dComponent}
    ]),
  ],
  exports: [
    Model3dComponent,
  ]
})
export class Model3DModule {}
