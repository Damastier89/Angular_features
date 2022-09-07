import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CoordinatesService } from '../../open-layer/services/coordinate.service';

type CoordinatesFormGroup = FormGroup<{
  coordinateX: FormControl<string | null>;
  coordinateY: FormControl<string | null>;
}>

@Component({
  selector: 'app-coordinates',
  templateUrl: './coordinates.component.html',
  styleUrls: ['./coordinates.component.scss']
})
export class CoordinatesComponent implements OnInit, OnDestroy {
  public form = new FormGroup({
    coordinates: new FormArray<CoordinatesFormGroup>([], [Validators.required]),
  });
  public coordinatesform = new FormGroup({
    clickCoordinateX: new FormControl({ value : '0', disabled: true}, [Validators.required]),
    clickCoordinateY: new FormControl({ value : '0', disabled: true}, [Validators.required]),
  })
  public submitted: boolean = false;
  public enabled: boolean = false;
  public tests:  boolean = false;
  public isCoordinates!: any;
  public test!: any[];

  private destroyNotifier: Subject<boolean> = new Subject<boolean>();

  public get coordinatesControl(): FormArray {
    return this.form.controls.coordinates;
  }

  constructor(
    private coordinatesService: CoordinatesService,
  ) { }

  ngOnInit(): void {
    this.initReceivedCoordinates();
    this.checkValueCoordinatesGroup();
    this.checkValueCoordinates();
    this.coordinatesService.getGeometryPolygon().pipe(
      takeUntil(this.destroyNotifier)
    ).subscribe({
      next: (res) => {
        console.log(`res`, res[0].coordinates);
        // this.test.push(res[0].coordinates);
        this.test = res[0].coordinates;
        console.log(`this.test`, this.test);
      },
      error: (err) => {
        console.log(`err`, err)
      }
    })
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
        console.log(`coordinates`, coordinates)
      },
      error: (err) => {
        console.log(`err`, err);
      }
    })
  }

  public sendCoordinates(): void {
    const polygonCoordinates: any[] = [];
    this.form.controls.coordinates.value.forEach((coordinate: any) => {
      console.log(`sendCoordinates`,coordinate)
      polygonCoordinates.push([coordinate.coordinateX, coordinate.coordinateY])
    })

    const coordinatesAreaPolygon = {
      coordinates: polygonCoordinates
    }

    this.coordinatesService.sendGeometryPolygon(coordinatesAreaPolygon).subscribe();

    console.log(`polygonCoordinates`,polygonCoordinates)
    console.log(`form : `, this.form);
  }

  public addCoordinates(): void {
    const coordinatesGroup = new FormGroup({
      coordinateX: new FormControl({value : '', disabled: true}, [Validators.required]),
      coordinateY: new FormControl({value : '', disabled: true}, [Validators.required]),
    });
    this.form.controls.coordinates.push(coordinatesGroup);
  }

  public removeSelectedCoordinates(index: number): void {
    this.form.controls.coordinates.removeAt(index);
  }

  public copyCoordinates(): void {
    for (let i = 0; i < this.form.controls.coordinates.value.length; i++) {
      if (this.form.controls.coordinates.value[i].coordinateX && this.form.controls.coordinates.value[i].coordinateY) continue;

      this.form.controls.coordinates.value[i].coordinateX = this.coordinatesform.get('clickCoordinateX')?.value;
      this.form.controls.coordinates.controls[i].patchValue({coordinateX: this.coordinatesform.get('clickCoordinateX')?.value});

      this.form.controls.coordinates.value[i].coordinateY = this.coordinatesform.get('clickCoordinateY')?.value;
      this.form.controls.coordinates.controls[i].patchValue({coordinateY: this.coordinatesform.get('clickCoordinateY')?.value});

    }
  }

  public checkValueCoordinatesGroup(): void {
    this.form.controls.coordinates.valueChanges.pipe(
        takeUntil(this.destroyNotifier)
      ).subscribe(value => {
      this.enabled = !value.every(control => control.coordinateX && control.coordinateY);
    })
  }

  public checkValueCoordinates(): void {
    if (this.form.controls.coordinates.length >= 3) {
      this.tests = false;
    } else {
      this.tests = true;
    }
  }
}
