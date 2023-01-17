import { NgModule } from '@angular/core';
import { CanvasComponent } from './canvas.component';
import { TitleModule } from '../shared/components/title/title.module';
import { RouterModule } from '@angular/router';
import { GraphicsComponent } from '../graphics/graphics.component';

@NgModule({
  declarations: [CanvasComponent],
  imports: [TitleModule, RouterModule.forChild([{ path: '', component: CanvasComponent }])],
  exports: [],
})
export class CanvasModule {}
