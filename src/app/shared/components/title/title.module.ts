import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title.component';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
	declarations: [TitleComponent],
	imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatButtonModule],
	exports: [TitleComponent],
})
export class TitleModule {}
