import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Feature, Map } from 'ol';
import { Subject, takeUntil } from 'rxjs';
import { unByKey } from 'ol/Observable';
import { Fill, Stroke, Style } from 'ol/style';
import { Coordinate } from 'ol/coordinate';
import { Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import { CoordinatesService } from '../../open-layer/services/coordinate.service';
import { ReferenceService } from '../../open-layer/services/reference.service';
import { MAIN_MAP } from '../../open-layer/tokens/reference.token';

type CoordinatesFormGroup = FormGroup<{
  coordinateX: FormControl<string | null>;
  coordinateY: FormControl<string | null>;
}>

interface PolygonCoordinates {
  coordinates: number;
}

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
  public isPolygons: boolean = false;
  public isCoordinates!: number[];
  public currentMap!: any;

  public layerPolygon: any

  private destroyNotifier: Subject<boolean> = new Subject<boolean>();

  public get coordinatesControl(): FormArray {
    return this.form.controls.coordinates;
  }

  constructor(
    private coordinatesService: CoordinatesService,
    @Inject(MAIN_MAP) private mapRefService: ReferenceService<Map>,
  ) { }

  ngOnInit(): void {
    this.initReceivedCoordinates();
    this.checkValueCoordinatesGroup();
    this.coordinatesService.isPolygons.subscribe((result: boolean) => {
      this.isPolygons = result;
    });

    this.mapRefService.snapshot?.on('click', (event) => {
      console.log(`event`, event)
      console.log(`pixel`, this.layerPolygon.getFeatures(event.pixel))
      this.layerPolygon.getFeatures(event.pixel).then(function (res: any) {
        console.log(`res`, res);
      })
    })
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next(true);
    this.destroyNotifier.complete();
    // Удаляет прослушиватель событий, используя ключ, возвращаемый on() или Once().
    unByKey(this.currentMap);
    // В BehaviorSubject нет необходимости, так как есть mapRefService
    // в котором хранится ссылка на карту
    // this.coordinatesService.coordinates$.next('');
  }

  public initReceivedCoordinates(): void {
    this.currentMap = this.mapRefService.snapshot?.on('click', (event) => {
        this.isCoordinates = event.coordinate;
        this.coordinatesform.controls['clickCoordinateX'].setValue(event.coordinate[0].toString());
        this.coordinatesform.controls['clickCoordinateY'].setValue(event.coordinate[1].toString());
    })
    // В BehaviorSubject нет необходимости, так как есть mapRefService
    // в котором хранится ссылка на карту
    // this.coordinatesService.coordinates$.pipe(
    //   takeUntil(this.destroyNotifier)
    // ).subscribe({
    //   next: (coordinates: any[]) => {
    //     this.isCoordinates = coordinates
    //     this.coordinatesform.controls['clickCoordinateX'].setValue(coordinates[0]);
    //     this.coordinatesform.controls['clickCoordinateY'].setValue(coordinates[1]);
    //     console.log(`MAIN coordinates`, coordinates)
    //   },
    //   error: (err) => {
    //     console.log(`err`, err);
    //   }
    // })
  }

  public sendCoordinates(): void {
    const polygonCoordinates: any[] = [];
    this.form.controls.coordinates.value.forEach((coordinate: any) => {
      polygonCoordinates.push([coordinate.coordinateX, coordinate.coordinateY])
    })

    const coordinatesAreaPolygon = {
      coordinates: polygonCoordinates
    }

    this.coordinatesService.sendGeometryPolygon(coordinatesAreaPolygon).subscribe();
    console.log(`coordinatesAreaPolygon`, coordinatesAreaPolygon)
  }

  public addCoordinates(): void {
    const coordinatesGroup = new FormGroup({
      coordinateX: new FormControl( '', [Validators.required]),
      coordinateY: new FormControl('', [Validators.required]),
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

  /**
   * Методы получения и добавления полигонов на карту
   */
  public removeCurrentPolygon(): void {
    this.coordinatesService.removePolygon().subscribe();
  }

  public getAllPolygonsCoordinates(): void {
    this.coordinatesService.getGeometryPolygon().pipe(
      takeUntil(this.destroyNotifier)
    ).subscribe({
      next: (polygonsCoordinates) => {
        this.coordinatesService.isPolygons.next(true);
        console.log(`polygonsCoordinates` , polygonsCoordinates)
        this.drawAllPolygons(polygonsCoordinates);
      },
      error: (err) => {
        console.log(`err`, err);
      }
    })
  }

  private drawAllPolygons(polygons: PolygonCoordinates[]): void {
    for (let i = 0; i < polygons.length; i ++) {
      this.addPolygonsOnMap([polygons[i].coordinates]);
    }
  }

  private addPolygonsOnMap(coordinates: Coordinate): void {
    const feature = new Feature({
      geometry: new Polygon(coordinates),
    });

    this.layerPolygon = this.createPolygonLayer();
    this.layerPolygon.getSource().addFeature(feature);
    this.mapRefService.snapshot?.addLayer(this.layerPolygon);
  }

  private createPolygonLayer(): any {
    return new VectorLayer({ // создание слоя для передачи объекту карты и отрисовки на карте
      source: new VectorSource(), // объект содержащий все Feature отрисовываемые в данном слое
      style: new Style({ // стили которые будут применены ко всем Feature в данном слое
        stroke: new Stroke({
          color: '#64ff00', // Цвет линии обводки
          width: 2, // Толщина линии обводки
        }),
        fill: new Fill({
          color: 'rgba(131,157,62, 0.5)', // Заливка полигона
        }),
      })
    });
  }

}
