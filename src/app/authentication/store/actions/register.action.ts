import { createAction, props } from "@ngrx/store";
import { RegisterReguestInterface } from "../../types/registerUser.interface";
import { ActionTypes } from "./actionTypes";

export const registerAction = createAction(
  ActionTypes.REGISTER,
  // В props храниться информация которая будет передаваться в action
  props<RegisterReguestInterface>()
);