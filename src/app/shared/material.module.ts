import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        MatSnackBarModule,
        MatDialogModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatExpansionModule,
        MatRadioModule,
        MatMenuModule,
        MatTooltipModule,
    ],
    exports: [
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        MatSnackBarModule,
        MatDialogModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatExpansionModule,
        MatRadioModule,
        MatMenuModule,
        MatTooltipModule,
    ],
})
export class MaterialModule {}
