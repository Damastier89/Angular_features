import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
export class AngularModalsComponent implements OnInit {
  public thing: string = '';
  public name: string = '';

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {name: this.name, animal: this.thing},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.thing = result;
    });
  }
}
