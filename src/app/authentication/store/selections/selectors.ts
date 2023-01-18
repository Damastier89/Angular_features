import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthStateInterface } from '../../types/authState.interface';

// Тут храниться функция, которая будет получать строку 'auth' или то,
// что там будет находится из StoreModule.forFeature('auth', redusers),
// и далее будем получать нужные нам часть.
export const authFeatureSelector = createFeatureSelector<AuthStateInterface>('authentication');

// isSubmittingSelector можно вызывать в любом месте приложения и получить доступ к полу isSubmitting
export const isSubmittingSelector = createSelector(authFeatureSelector, (authState: AuthStateInterface) => authState.isSubmitting);
