import { DataFormInterface } from '../../interfaces/dataForm.interface';
import { HttpErrorsInterface } from '../../../../shared/interfaces/httpErrors.interface';

export interface FeedbackStateInterface {
    isSubmitting: boolean;
    dataFromForm: DataFormInterface | null;
    validationErrors: HttpErrorsInterface | null;
}
