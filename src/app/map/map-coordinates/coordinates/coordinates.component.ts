import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  public coordinatesform = new UntypedFormGroup({
    clickCoordinateX: new UntypedFormControl({ value : '0', disabled: true}, [Validators.required]),
    clickCoordinateY: new UntypedFormControl({ value : '0', disabled: true}, [Validators.required]),
  })
  public submitted: boolean = false;
  public isCoordinates!: any;
  test: any

  private destroyNotifier: Subject<boolean> = new Subject<boolean>();

  public get coordinatesControl(): UntypedFormArray {
    return this.form.get('coordinates') as UntypedFormArray;
  }

  constructor(
    private coordinatesService: CoordinatesService,
  ) { }

  ngOnInit(): void {
    this.initReceivedCoordinates();
    // this.isValidForm()
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next(true);
    this.destroyNotifier.complete();
    this.coordinatesService.coordinates$.next('');
  }

  public initReceivedCoordinates(): void {
    this.coordinatesService.coordinates$.pipe(
      takeUntil(this.destroyNotifier)
    ).subscribe({
      next: (coordinates: any[]) => {
        this.isCoordinates = coordinates
        this.coordinatesform.controls['clickCoordinateX'].setValue(coordinates[0]);
        this.coordinatesform.controls['clickCoordinateY'].setValue(coordinates[1]);
        console.log(`coord`, coordinates)
      },
      error: (err) => {
        console.log(`err`, err);
      }
    })
  }

  public sendCoordinates(): void {
    console.log(`form : `, this.form);
    const polygonCoordinates: any[] = [];
    (this.form.get('coordinates') as UntypedFormArray).value.forEach((coord: any) => {
      polygonCoordinates.push([coord.coordinateX, coord.coordinateY])
    })
    console.log(polygonCoordinates)

    const coord = {
      coord: [polygonCoordinates]
    }
    this.coordinatesService.sendGeometryPolygon(coord);

  }

  public addCoordinates(): void {
    const coordinatesGroup = new UntypedFormGroup({
      coordinateX: new UntypedFormControl({value : '', disabled: true}, [Validators.required]),
      coordinateY: new UntypedFormControl({value : '', disabled: true}, [Validators.required]),
    });
    (this.form.get('coordinates') as UntypedFormArray).push(coordinatesGroup);
  }

  public removeSelectedCoordinates(index: number): void {
    (this.form.get('coordinates') as UntypedFormArray).controls.splice(index, 1);
    (this.form.get('coordinates') as UntypedFormArray).value.splice(index, 1);
  }

  public copyCoordinates(): void {
    for (let i = 0; i < this.form.controls['coordinates'].value.length; i++) {
      if (this.form.controls['coordinates'].value[i].coordinateX && this.form.controls['coordinates'].value[i].coordinateY) continue;
      
      this.form.controls['coordinates'].value[i].coordinateX = this.coordinatesform.get('clickCoordinateX')?.value;
      (this.form.controls['coordinates'] as UntypedFormArray).controls[i].patchValue({coordinateX: this.coordinatesform.get('clickCoordinateX')?.value});
  
      this.form.controls['coordinates'].value[i].coordinateY = this.coordinatesform.get('clickCoordinateY')?.value;
      (this.form.controls['coordinates'] as UntypedFormArray).controls[i].patchValue({coordinateY: this.coordinatesform.get('clickCoordinateY')?.value});

    }
  }

  // public isValidForm(): boolean {
  //   let test: any;
  //   if (this.form.controls['coordinates'].value.length < 3 || this.form.controls['coordinates'].value != '') {
  //     test = false
  //   }
  //   return test;
  // }

}
