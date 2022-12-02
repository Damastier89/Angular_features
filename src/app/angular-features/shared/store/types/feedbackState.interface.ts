import { DataFormInterface } from "../../interfaces/dataForm.interface";
import { HttpErrorsInterface } from "./httpErrors.interface";

export interface FeedbackStateInterface {
  isSubmitting: boolean; 
  isLoggedIn: boolean | null;
  dataFromForm: DataFormInterface | null;
  validationErrors: HttpErrorsInterface | null;
}