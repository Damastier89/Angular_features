import { createAction, props } from "@ngrx/store";
import { RegisterRequestInterface } from "../../types/registerUser.interface";
import { ActionTypes } from "./actionTypes";

export const registerAction = createAction(
  ActionTypes.REGISTER,
  // В props храниться информация которая будет передаваться в action
  props<RegisterRequestInterface>()
);

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<RegisterRequestInterface>()
);

export const registerFailuerAction = createAction(ActionTypes.REGISTER_FAILURE);