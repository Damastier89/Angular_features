import { createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../../types/authState.interface";
import { registerAction } from "../actions/register.action";

const initialState: AuthStateInterface = {
  isSubmitting: false,
}

// Reducer - это функция, которая меняет состояние. 
// Когда именно нужно менять состояние Reducer узнает от Action
export const authReducer = createReducer(
  initialState,
  // Передаем в on() первым аргументом action для выполнения, 
  // а вторым параметром передаем функцию, которая будет менять состояние приложения.
  on(registerAction, (state: AuthStateInterface) => ({
      ...state,
      isSubmitting: true,
    })
  ) 
); 

// export function redusers(state: AuthStateInterface, action: Action) {
//   return authReducer(state, action);
// }