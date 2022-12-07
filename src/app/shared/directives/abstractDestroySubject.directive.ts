import { Directive, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";

/**
 * Предоставляет Observable при уничтожении компонента
 */
@Directive()
export abstract class AbstractDestroySubject implements OnDestroy {
  private onDestroy: Subject<void | null> = new Subject<void | null>();

  public get onDestroy$(): Observable<void | null> {
    return this.onDestroy.asObservable();
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}