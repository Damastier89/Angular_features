import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CoordinatesService } from '../../open-layer/services/coordinate.service';

@Component({
  selector: 'app-coordinates',
  templateUrl: './coordinates.component.html',
  styleUrls: ['./coordinates.component.scss']
})
export class CoordinatesComponent implements OnInit, OnDestroy {
  public form = new UntypedFormGroup({
    coordinates: new UntypedFormArray([]),
  });

  private destroyNotifier: Subject<boolean> = new Subject<boolean>();

  public get coordinatesControl(): UntypedFormArray {
    return this.form.get('coordinates') as UntypedFormArray;
  }

  constructor(
    private coordinatesService: CoordinatesService,
  ) { }

  ngOnInit(): void {
    this.coordinatesService.coordinates$.pipe(
      takeUntil(this.destroyNotifier)
    ).subscribe({
      next: (coord: string) => {
        // this.coordinates = coord;
      },
      error: (err) => {
        console.log(`err`, err);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next(true);
    this.destroyNotifier.complete();
    this.coordinatesService.coordinates$.next('');
  }

  public sendCoordinates(): void {
    console.log(`form : `, this.form);
    const polygonCoordinates: any[] = [];
    (this.form.get('coordinates') as UntypedFormArray).value.forEach((coord: any) => {
      polygonCoordinates.push([coord.coordinateX, coord.coordinateY])
    })
    console.log(polygonCoordinates)
  }

  public addCoordinates(): void {
    const coordinatesGroup = new UntypedFormGroup({
      coordinateX: new UntypedFormControl(''),
      coordinateY: new UntypedFormControl(''),
    });
    (this.form.get('coordinates') as UntypedFormArray).push(coordinatesGroup);
  }

}
