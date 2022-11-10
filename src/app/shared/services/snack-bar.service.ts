import { openConfig } from './../interfaces/openConfig';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

const actionsData: any = {
  error: {
    txt: '⛔',
    cssClass: 'snackBar-error'
  },
  success: {
    txt: '✅',
    cssClass: 'snackBar-success'
  },
  warning: {
    txt: '⚠️',
    cssClass: 'snackBar-warning'
  }
};

// '☢️' '🚫'
/* стилизация в файле src/style.scss */
/* при добавлении нового типа, необходимо его так же добавить в src/app/shared/_models/snack-bar-types.enum.ts */
@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  public openSnackBar(cfg: openConfig): MatSnackBarRef<TextOnlySnackBar> {
    if (typeof cfg.matSnackBarCfg === 'undefined') {
      cfg.matSnackBarCfg = {};
    }
    if (typeof cfg.matSnackBarCfg.duration === 'undefined') {
      cfg.matSnackBarCfg.duration = 5000;
    }
    cfg.matSnackBarCfg.panelClass = actionsData[cfg.actionType].cssClass;
    return this.snackBar.open(cfg.message , actionsData[cfg.actionType].txt, cfg.matSnackBarCfg);
  };

  public openSnackBarSetDuration(cfg: openConfig, duration: number): MatSnackBarRef<TextOnlySnackBar> {
    if (typeof cfg.matSnackBarCfg === 'undefined') {
      cfg.matSnackBarCfg = {};
    }
    if (typeof cfg.matSnackBarCfg.duration === 'undefined') {
      cfg.matSnackBarCfg.duration = duration;
    }
    cfg.matSnackBarCfg.panelClass = actionsData[cfg.actionType].cssClass;
    return this.snackBar.open(cfg.message , actionsData[cfg.actionType].txt, cfg.matSnackBarCfg);
  };
}
