import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Сервис для хранения ссылки на карту и любой другой переданный объект
 */
@Injectable()
export class ReferenceService<T> {
  private reference = new BehaviorSubject<T | null>(null);

  reference$ = this.reference.asObservable();

  public get snapshot(): T | null {
    return this.reference.value;
  }

  public set(reference: T): void {
    this.reference.next(reference);
  }

  public clear(): void {
    this.reference.next(null);
  }
}
