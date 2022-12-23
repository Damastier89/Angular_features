import { createReducer, on } from "@ngrx/store";

import { AdminStateInterface } from "../types/adminState.interface";
import { adminAction, adminFailuerAction, adminSuccessAction } from "../actions/admin.action";

const initialState: AdminStateInterface = {
  isLogged: false,
  adminData: null,
  validationErrors: null,
};

// Reducer - это функция, которая меняет состояние.
// Когда именно нужно менять состояние Reducer узнает от Action
export const adminReducer = createReducer(
  initialState,
  // Передаем в on() первым аргументом action для выполнения,
  // а вторым параметром передаем функцию, которая будет менять состояние приложения.
  on(adminAction, (state): AdminStateInterface => ({
      ...state,
      isLogged: true,
    })
  ),

  on(adminSuccessAction, (state, action): AdminStateInterface => ({
      ...state,
      isLogged: true,
      adminData: action,
      validationErrors: null,
    })
  ),

  on(adminFailuerAction, (state, action): AdminStateInterface => ({
      ...state,
      isLogged: false,
      validationErrors: action,
    })
  ),

)
