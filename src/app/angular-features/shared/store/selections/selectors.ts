import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeedbackStateInterface } from "../types/feedbackState.interface";

/**
 * Тут храниться функция, которая будет получать строку 'feedback' или то, 
    что там будет находится из StoreModule.forFeature('feedback', redusers),
    и далее будем получать нужные нам часть.
 */
export const feedbackFeatureSelector = createFeatureSelector<
  FeedbackStateInterface
>('feedback');

/**
 * isSubmittingSelector данный селектор можно вызывать в любом месте приложения и получить доступ к state и полю isSubmitting
 */
export const isSubmittingSelector = createSelector(
  feedbackFeatureSelector, 
  (state: FeedbackStateInterface) => state.isSubmitting,
);

export const validationErrorsSelector = createSelector(
  feedbackFeatureSelector,
  (state: FeedbackStateInterface) => state.validationErrors,
);