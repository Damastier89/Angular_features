import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { text: string; buttons: { confirm: string; cancel: string } },
        public ref: MatDialogRef<ConfirmComponent>,
    ) {}
}
