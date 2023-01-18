import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Сервис для хранения ссылки на карту MOSCOW
 */
@Injectable()
export class ReferenceMiniMapService<T> {
    private referenceMiniMap = new BehaviorSubject<T | null>(null);

    referenceMiniMap$ = this.referenceMiniMap.asObservable();

    public get snapshot(): T | null {
        return this.referenceMiniMap.value;
    }

    public set(referenceMSC: T): void {
        this.referenceMiniMap.next(referenceMSC);
    }

    public clear(): void {
        this.referenceMiniMap.next(null);
    }
}
