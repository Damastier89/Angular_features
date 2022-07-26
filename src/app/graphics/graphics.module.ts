import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GraphicsComponent } from "./graphics.component";
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    GraphicsComponent,
  ],
  imports: [
    ChartModule,
    RouterModule.forChild([
      { path: '', component: GraphicsComponent }
    ]),
  ],
})
export class GraphicsModule {}