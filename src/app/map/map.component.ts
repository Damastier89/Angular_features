import 'ol/ol.css';
import { Component, ElementRef, Inject, NgZone, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { defaults , FullScreen, OverviewMap, ScaleLine, ZoomToExtent } from 'ol/control';
import { altKeyOnly } from 'ol/events/condition'; // import * as olEvents from 'ol/events';
import { Overlay, View } from 'ol';
import { Map } from 'ol';
import { DragRotate , Draw } from 'ol/interaction';
import { MapControlService } from './open-layer/services/map-control.service';
import { DrawGeometryService } from './open-layer/services/draw-geometry.service';
import { CoordinatesСity } from './open-layer/_types/coordinates';
import { MatMenuTrigger } from '@angular/material/menu';
import { LAYERS } from './open-layer/_types/layers';
import { DrawIconService } from './open-layer/services/draw-icon.service';
import { MAIN_MAP } from './open-layer/tokens/reference.token';
import { ReferenceService } from './open-layer/services/_index';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerGroup from 'ol/layer/Group';
import { SIDEBAR_ANIMATION_SWITCHER } from './animation/animation-config';
import { CoordinatesService } from './open-layer/services/coordinate.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  animations: [SIDEBAR_ANIMATION_SWITCHER],
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('contextMenuGeometryTrigger', { read: MatMenuTrigger }) contextMenu!: MatMenuTrigger;
  @ViewChild('contextMenuMarcerTrigger', { read: MatMenuTrigger }) contextMenuMarcer!: MatMenuTrigger;
  @ViewChild('coordinates') coordinates?: any;
  public name: string = 'Map Viewer - Openlayers & Angular';
  public panelOpenState: boolean = false;
  public isMap: boolean = false;
  public map!: Map;
  public drawInteractions!: Draw;
  public popup = new Overlay({
    element: this.coordinates,
  });

  public contextMenuPosition = { x: 0, y: 0 };

  public coordinatesX: string = '00° 00′ 00″ С.Ш.';
  public coordinatesY: string = '00° 00′ 00″ В.Д.';

  public isOpenProperties: boolean = false;
  public isAnimationProperties: boolean = false;

  private baseLayers!: LayerGroup;
  private rasterLayers!: LayerGroup;
  private zoomToExtentControls = new ZoomToExtent();
  private scaleLineControls = new ScaleLine();
  private fullScreenControl = new FullScreen();
  private overviewMapControl = new OverviewMap({
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
  });

  constructor(
    private zone: NgZone, // Для оптимизации работы приложения
    private readonly renderer: Renderer2,
    private mapControl: MapControlService,
    private drawGeometry: DrawGeometryService,
    private readonly elementRef: ElementRef, // Мы получаем доступ к DOM элементам в это компоненте через DI.
    // указывает тип обьекта ссылку на который будем хранить в сервисе
    @Inject(MAIN_MAP) private mapRefService: ReferenceService<Map>,
    private drawIcon: DrawIconService,
    private coordinatesService: CoordinatesService,
  ) {}

  ngOnInit(): void {
    this.initAllMethodsForMap();
    this.initLayersToMap();
    this.clickMouse();
  }

  ngOnDestroy() {
    this.mapRefService.clear();
  }

  public initAllMethodsForMap(): void {
    this.initMap();
    this.getCoordinateMouseOnMap();
    this.getCoordinateOnMapToClick();
    this.dragRotateInteraction();
  }

  public onContextMenu(event: MouseEvent) {
    event.preventDefault();

    // Опционально получаем координаты элемента(Диалоговое меню и т.д) для корректной отрисовки Mat-menu
    const clientRect = this.elementRef.nativeElement.getBoundingClientRect();
    // this.contextMenuPosition.x = event.clientX - clientRect.x + 10;
    // this.contextMenuPosition.y = event.clientY - clientRect.y + 34;

    // Получаем координаты мыши
    this.contextMenuPosition.x = event.clientX;
    this.contextMenuPosition.y = event.clientY;

    // Обращаемся к меню для его открытия
    this.contextMenu.openMenu();
  }

  public onContextMenuMarcer(event: MouseEvent) {
    event.preventDefault();

    // Опционально получаем координаты элемента(Диалоговое меню и т.д) для корректной отрисовки Mat-menu
    const clientRect = this.elementRef.nativeElement.getBoundingClientRect();
    // this.contextMenuPosition.x = event.clientX - clientRect.x + 10;
    // this.contextMenuPosition.y = event.clientY - clientRect.y + 34;

    // Получаем координаты мыши
    this.contextMenuPosition.x = event.clientX;
    this.contextMenuPosition.y = event.clientY;

    // Обращаемся к меню для его открытия
    this.contextMenuMarcer.openMenu();
  }

  private initMap() {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 1,
        // maxZoom: 10,
        // minZoom: 3,
      }),
      target: 'map',
      keyboardEventTarget: document,
      controls: defaults().extend([
        this.fullScreenControl,
        this.overviewMapControl,
        this.scaleLineControls,
        this.zoomToExtentControls,
      ])
    });

    this.mapRefService.set(this.map);
  }

  public initMoscow() {
    this.mapControl.initNewCityOnMap('msc', CoordinatesСity.MOSCOW, true)
    this.closeMap();
    this.isMap = this.mapControl.isCliked
  }

  public initTula() {
    this.mapControl.initNewCityOnMap('msc', CoordinatesСity.KALUGA, true)
    this.closeMap();
    this.isMap = this.mapControl.isCliked
  }

  public closeMap() {
      if (this.isMap) {
        setTimeout(() => {
          this.isMap = false;
        }, 0)
      }
  }
/**
 * Метод для отображения координат положения мыши на карте
 */
  private getCoordinateMouseOnMap(): void {
    this.map.on('pointermove', (event) => {
      this.coordinatesX = `${event.coordinate[0]}`;
      this.coordinatesY= `${event.coordinate[1]}`;
    })
  }

/**
 * Метод для получения координат по клику мыши на карту
 */
  private getCoordinateOnMapToClick(): void {
    this.map.on('click', (event) => {
      const clickedCoordinate = event.coordinate.join(', ');
      this.renderer.setProperty(this.coordinates.nativeElement, 'innerHTML', clickedCoordinate);
      this.coordinatesService.coordinates$.next(clickedCoordinate);
    })
  }

/**
 * DragRotate Interaction
 */
  public dragRotateInteraction(): void {
    const dragRotate = new DragRotate({
      condition: altKeyOnly,
    })
    this.map.addInteraction(dragRotate);
  }

  public drawImage(iconType: string) {
    this.drawIcon.activate(iconType);
  }

  public clickMouse() {
    console.log(` done deactivate`)
    this.map.getViewport().addEventListener('contextmenu', (event) => {
      this.drawIcon.deactivate();
    })
  }

/**
 * Методы для отрисовки геометрических фигур
 */
  public drawPolygon(): void {
    this.drawGeometry.createPolygon(this.map)
  }

  public drawMultiPolygon(): void {
    this.drawGeometry.createMultiPolygon(this.map)
  }

  public drawCircle(): void {
    this.drawGeometry.createCircle(this.map)
  }

  public drawPoint(): void {
    this.drawGeometry.createPoint(this.map)
  }

  public drawLineString(): void {
    this.drawGeometry.createLineString(this.map)
  }

  public drawLinearRing(): void {
    this.drawGeometry.createLinearRing(this.map)
  }

  public drawMultiPoint(): void {
    this.drawGeometry.createMultiPoint(this.map)
  }

  public drawMultiLineString(): void {
    this.drawGeometry.createMultiLineString(this.map)
  }

  public drawGeometryCollection(): void {
    this.drawGeometry.createGeometryCollection(this.map)
  }

/**
 * Анимация правой панели
 */
  public handleAnimationEvent(event: any): void {
    if (event.toState) {
      this.isAnimationProperties = true;
    }
  }

  public toggelPanel() {
    this.isOpenProperties = !this.isOpenProperties;
    this.isAnimationProperties = false;
  }

/**
 * Методы для переключения слоёв
 */

/**
 * Установка конкретного слоя
 * @param event - выбранный чек-бокс
 */
  public switchBaseLayer(event: any): void {
    this.checkTileLayers(this.baseLayers, event);
  }

  public switchRasterLayer(event: any): void {
    this.checkTileLayers(this.rasterLayers, event);
  }

  private checkTileLayers(groupLayers: LayerGroup, event: any) {
    groupLayers.getLayersArray().forEach( layer => {
      layer.setVisible(layer.get('title') === event.value)
    })
  }

/**
 * Записываем созданные слои в глобальную переменную(для сохранения ссылки)
 * Добавляем полученные слои на карту
 */
  private initLayersToMap(): void {
    this.baseLayers = this.createBaseTileLayersGroup();
    this.rasterLayers = this.createRasterTileLayersGroup();
    this.map.addLayer(this.baseLayers);
    this.map.addLayer(this.rasterLayers);
  }

  private createBaseTileLayersGroup(): LayerGroup {
    const baseLayerGroup = new LayerGroup({
      layers: [
        LAYERS.OSM_Humanitarian,
        LAYERS.OSM_Standart,
        LAYERS.OSM_Transport,
        LAYERS.OSM_Cycle,
        LAYERS.Stament_Terrain,
        LAYERS.Green_Map,
        LAYERS.Bing_Map,
        LAYERS.CartoDB_Map,
      ]
    });

    return baseLayerGroup;
  }

  private createRasterTileLayersGroup(): LayerGroup {
    const rasterLayerGroup = new LayerGroup({
      layers: [
        LAYERS.Tile_Debug_Layer,
        LAYERS.Tile_ArcGIS_REST_API_Layer,
        LAYERS.NOAA_WMS_Layer,
      ]
    })

    return rasterLayerGroup;
  }

}




