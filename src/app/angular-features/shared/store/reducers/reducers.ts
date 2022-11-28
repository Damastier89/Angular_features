import { createReducer, on } from "@ngrx/store";
import { feedbackAction } from "../actions/feedback.action";
import { FeedbackStateInterface } from "../types/feedbackState.interface";

const initialState: FeedbackStateInterface = {
  isSubmitting: false,
}

// Reducer - это функция, которая меняет состояние. 
// Когда именно нужно менять состояние Reducer узнает от Action
export const feedbackReducer = createReducer(
  initialState,
  // Передаем в on() первым аргументом action для выполнения, 
  // а вторым параметром передаем функцию, которая будет менять состояние приложения.
  on(feedbackAction, (state: FeedbackStateInterface) => ({
      ...state,
      isSubmitting: true,
    })
  ) 
); 