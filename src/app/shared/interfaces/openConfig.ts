import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface openConfig {
	matSnackBarCfg?: MatSnackBarConfig;
	message: string;
	actionType: string;
	duration?: number;
}
