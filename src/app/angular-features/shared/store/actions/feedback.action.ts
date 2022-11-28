import { createAction, props } from "@ngrx/store";
import { DataFormInterface } from "../../interfaces/dataForm.interface";
import { FeedbackActionsType } from "./feedbackActionsType";

export const feedbackAction = createAction(
  FeedbackActionsType.FEEDBACK,
  // В props храниться информация которая будет передаваться в action
  props<DataFormInterface>()
);

export const feedbackSuccessAction = createAction(
  FeedbackActionsType.FEEDBACK_SUCCESS,
  props<DataFormInterface>()
);

export const feedbackFailuerAction = createAction(FeedbackActionsType.FEEDBACK_FAILURE);