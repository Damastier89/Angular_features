import { InjectionToken } from "@angular/core";
import { ReferenceService } from "../services/_index";

// Для создания дополнительных токенов, добавить их сюда и в массив referenceProviders
export const MAIN_MAP = new InjectionToken<string>('MainMap');

export const referenceProviders = [
  { provide: MAIN_MAP, useClass: ReferenceService },
];
