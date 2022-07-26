import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GraphicsComponent } from "./graphics.component";

@NgModule({
  declarations: [
    GraphicsComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: GraphicsComponent }
    ]),
  ],
})
export class GraphicsModule {}