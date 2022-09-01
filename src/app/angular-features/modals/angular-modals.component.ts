import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil, takeWhile, tap } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';

export interface DialogData {
  name: string;
  thing: string;
}

@Component({
  selector: 'app-angular-modals',
  templateUrl: './angular-modals.component.html',
  styleUrls: ['./angular-modals.component.scss']
})
export class AngularModalsComponent implements OnInit, OnDestroy {
  public thing: string = '';
  public name: string = '';

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      hasBackdrop: false,
      data: {name: this.name, animal: this.thing},
    });

    dialogRef.afterClosed().pipe(
      takeWhile(res => res), // Если false то дальше не пойдет, нужно для отписки. [mat-dialog-close]="false"
    ).subscribe((result: DialogData) => {
      console.log(`result :`, result);
      this.thing = result.thing;
    });
  }
}
