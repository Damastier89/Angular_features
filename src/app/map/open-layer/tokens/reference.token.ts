import { InjectionToken } from '@angular/core';
import { ReferenceMiniMapService } from '../services/referenceMiniMap.service';
import { ReferenceService } from '../services/_index';

// Для создания дополнительных токенов, добавить их сюда и в массив referenceProviders
export const MAIN_MAP = new InjectionToken<string>('MainMap');
export const MINI_MAP = new InjectionToken<string>('MiniMap');

export const referenceProviders = [
    { provide: MAIN_MAP, useClass: ReferenceService },
    { provide: MINI_MAP, useClass: ReferenceMiniMapService },
];
