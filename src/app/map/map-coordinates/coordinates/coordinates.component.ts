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
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { SnackBarTypes } from '../../../shared/_models/snack-bar-types.enum';
import { Select } from 'ol/interaction';

type CoordinatesFormGroup = FormGroup<{
	coordinateX: FormControl<string | null>;
	coordinateY: FormControl<string | null>;
}>;

interface PolygonCoordinates {
	coordinates: number;
	id: string;
}

@Component({
	selector: 'app-coordinates',
	templateUrl: './coordinates.component.html',
	styleUrls: ['./coordinates.component.scss'],
})
export class CoordinatesComponent implements OnInit, OnDestroy {
	public form = new FormGroup({
		coordinates: new FormArray<CoordinatesFormGroup>([], [Validators.required]),
	});

	public coordinatesform = new FormGroup({
		clickCoordinateX: new FormControl({ value: '0', disabled: true }, [Validators.required]),
		clickCoordinateY: new FormControl({ value: '0', disabled: true }, [Validators.required]),
	});

	public submitted: boolean = false;

	public enabled: boolean = false;

	public tests: boolean = false;

	public isPolygons: boolean = false;

	public isCoordinates!: number[];

	public isSelectedPolygon: boolean = true;

	public currentMap!: any;

	private layerPolygon!: VectorLayer<any>;

	private featuresPolygon!: Feature;

	private selectInteraction!: Select;

	private destroyNotifier: Subject<boolean> = new Subject<boolean>();

	public get coordinatesControl(): FormArray {
		return this.form.controls.coordinates;
	}

	constructor(
		private coordinatesService: CoordinatesService,
		private snackBarService: SnackBarService,
		@Inject(MAIN_MAP) private mapRefService: ReferenceService<Map>,
	) {}

	ngOnInit(): void {
		this.initReceivedCoordinates();
		this.checkValueCoordinatesGroup();
		// this.selectedPolygon();
		this.coordinatesService.isPolygons.subscribe((result: boolean) => {
			this.isPolygons = result;
		});

		// this.mapRefService.snapshot?.getAllLayers();
	}

	ngOnDestroy(): void {
		this.destroyNotifier.next(true);
		this.destroyNotifier.complete();
		// Удаляет прослушиватель событий, используя ключ, возвращаемый on() или Once().
		unByKey(this.currentMap);
	}

	public initReceivedCoordinates(): void {
		this.currentMap = this.getMap();
		this.currentMap.on('click', (event: any) => {
			this.isCoordinates = event.coordinate;
			this.coordinatesform.controls.clickCoordinateX.setValue(event.coordinate[0].toString());
			this.coordinatesform.controls.clickCoordinateY.setValue(event.coordinate[1].toString());
		});
	}

	public sendCoordinates(): void {
		const polygonCoordinates: any[] = [];
		this.form.controls.coordinates.value.forEach((coordinate: any) => {
			polygonCoordinates.push([coordinate.coordinateX, coordinate.coordinateY]);
		});

		const coordinatesAreaPolygon = {
			coordinates: polygonCoordinates,
		};

		this.coordinatesService
			.sendGeometryPolygon(coordinatesAreaPolygon)
			.pipe(takeUntil(this.destroyNotifier))
			.subscribe({
				next: () => {
					this.openSnackBar(SnackBarTypes.Success, `Полигон добавлен`);
				},
				error: () => {
					this.openSnackBar(SnackBarTypes.Error, `Не удалось добавить полигон`);
				},
			});
	}

	public addCoordinates(): void {
		const coordinatesGroup = new FormGroup({
			coordinateX: new FormControl('', [Validators.required]),
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
			this.form.controls.coordinates.controls[i].patchValue({
				coordinateX: this.coordinatesform.get('clickCoordinateX')?.value,
			});

			this.form.controls.coordinates.value[i].coordinateY = this.coordinatesform.get('clickCoordinateY')?.value;
			this.form.controls.coordinates.controls[i].patchValue({
				coordinateY: this.coordinatesform.get('clickCoordinateY')?.value,
			});
		}
	}

	public checkValueCoordinatesGroup(): void {
		this.form.controls.coordinates.valueChanges.pipe(takeUntil(this.destroyNotifier)).subscribe((value) => {
			this.enabled = !value.every((control) => control.coordinateX && control.coordinateY);
		});
	}

	/**
	 * Методы получения, добавления и удаления Features на карту
	 */
	public removeSelectedPolygon(): void {
		const selectedCollection = this.selectInteraction.getFeatures();
		// для удаления одной Feature
		// const selectedFeatures = selectedCollection.item(0);
		// this.layerPolygon.getSource().removeFeature(selectedFeatures);
		// selectedCollection.clear();

		// для множественного выбора и удаления нескольких Features
		selectedCollection.forEach((feature) => {
			this.layerPolygon.getSource().removeFeature(feature);
			this.openSnackBar(SnackBarTypes.Success, `Выбранный полигон удален`);
		});
		selectedCollection.clear();
	}

	public getAllPolygonsCoordinates(): void {
		this.coordinatesService
			.getGeometryPolygon()
			.pipe(takeUntil(this.destroyNotifier))
			.subscribe({
				next: (polygonsCoordinates: PolygonCoordinates[]) => {
					this.selectedPolygon();
					this.coordinatesService.isPolygons.next(true);
					this.drawAllPolygons(polygonsCoordinates);
				},
				error: (err) => {
					console.log(`err`, err);
				},
			});
	}

	private getMap() {
		return this.mapRefService.snapshot;
	}

	private drawAllPolygons(polygons: PolygonCoordinates[]): void {
		const map = this.getMap();
		const features = [];

		for (let i = 0; i < polygons.length; i++) {
			const feature = this.createFeature([polygons[i].coordinates]);
			features.push(feature);
		}

		this.layerPolygon = this.createPolygonLayer();
		this.layerPolygon.getSource().addFeatures(features);
		map?.addLayer(this.layerPolygon);
	}

	private createFeature(coordinates: Coordinate): Feature {
		return new Feature({
			geometry: new Polygon(coordinates),
		});
		// Позволяет добавить к Feature дополнительные свойства
		// this.featuresPolygon.setProperties({
		//   id: new Date().getTime(),
		// })
		// this.featuresPolygon.setGeometryName('My polygon');
	}

	private createPolygonLayer(): any {
		return new VectorLayer({
			// создание слоя для передачи объекту карты и отрисовки на карте
			source: new VectorSource(), // объект содержащий все Feature отрисовываемые в данном слое
			style: new Style({
				// стили которые будут применены ко всем Feature в данном слое
				stroke: new Stroke({
					color: '#64ff00', // Цвет линии обводки
					width: 2, // Толщина линии обводки
				}),
				fill: new Fill({
					color: 'rgba(131,157,62, 0.5)', // Заливка полигона
				}),
			}),
		});
	}

	// метод для выделения Feature
	private selectedPolygon(): any {
		const map = this.getMap();
		this.selectInteraction = this.selectFeature();
		map?.addInteraction(this.selectInteraction);
		this.isSelectedPolygon = false;
	}

	private selectFeature() {
		return new Select();
	}

	/**
	 * Сообщения для пользователя
	 */
	private openSnackBar(actionType: string, message: string): void {
		this.snackBarService.openSnackBar({
			actionType,
			message,
		});
	}
}
