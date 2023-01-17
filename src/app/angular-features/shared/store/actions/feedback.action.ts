import { createAction, props } from '@ngrx/store';
import { DataFormInterface } from '../../interfaces/dataForm.interface';
import { HttpErrorsInterface } from '../../../../shared/interfaces/httpErrors.interface';
import { FeedbackActionsType } from './feedbackActionsType';

export const feedbackAction = createAction(
  FeedbackActionsType.FEEDBACK,
  props<DataFormInterface>(), // В props храниться информация которая будет передаваться в action
);

export const feedbackSuccessAction = createAction(
  FeedbackActionsType.FEEDBACK_SUCCESS,
  props<DataFormInterface>(),
);

export const feedbackFailuerAction = createAction(
  FeedbackActionsType.FEEDBACK_FAILURE,
  props<HttpErrorsInterface>(),
);
