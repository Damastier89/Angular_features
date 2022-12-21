import { createAction, props } from "@ngrx/store";

import { AdminActionType } from "./adminActionType";
import { AdminInterface } from "../../interfaces/admin.interface";
import { HttpErrorsInterface } from "../../../../shared/interfaces/httpErrors.interface";

export const adminAction = createAction(
  AdminActionType.ADMIN,
  props<AdminInterface>() // В props храниться информация которая будет передаваться в action
);

export const adminSuccessAction = createAction(
  AdminActionType.ADMIN_SUCCESS,
  props<AdminInterface>()
);

export const adminFailuerAction = createAction(
  AdminActionType.ADMIN_FAILURE,
  props<HttpErrorsInterface>()
);
