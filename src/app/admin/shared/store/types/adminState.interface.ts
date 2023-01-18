import { AdminInterface } from '../../interfaces/admin.interface';
import { HttpErrorsInterface } from '../../../../shared/interfaces/httpErrors.interface';

export interface AdminStateInterface {
	isLogged: boolean;
	adminData: AdminInterface | null;
	validationErrors: HttpErrorsInterface | null;
}
