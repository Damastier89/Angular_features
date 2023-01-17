import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminStateInterface } from '../types/adminState.interface';

/**
 * Тут храниться функция, которая будет получать строку 'admin' или то,
 что там будет находиться из StoreModule.forFeature('admin', reducers),
 и далее будем получать нужные нам часть.
 */
export const adminFeatureSelector = createFeatureSelector<AdminStateInterface>('admin');

/**
 * validationErrorsSelector - данный селектор можно вызывать в любом месте приложения и получить доступ к state
 */

export const validationErrorsSelector = createSelector(
  adminFeatureSelector,
  (state: AdminStateInterface) => state.validationErrors,
);

export const isAdminLogged = createSelector(
  adminFeatureSelector,
  (state: AdminStateInterface) => state.isLogged,
);
