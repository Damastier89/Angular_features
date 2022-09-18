// import 'ol/ol.css';
import { Component, ElementRef, Inject, NgZone, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

import { defaults, FullScreen, OverviewMap, ScaleLine, ZoomToExtent } from 'ol/control';
import { altKeyOnly, click } from 'ol/events/condition'; // import * as olEvents from 'ol/events';
import { Overlay, View, Map } from 'ol';
import { DragRotate, Draw, Select } from 'ol/interaction';
import { Fill, Stroke, Style } from 'ol/style';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerGroup from 'ol/layer/Group';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

import { MapControlService } from './open-layer/services/map-control.service';
import { DrawGeometryService } from './open-layer/services/draw-geometry.service';
import { CoordinatesСity } from './open-layer/_types/coordinates';
import { LAYERS } from './open-layer/_types/layers';
import { DrawIconService } from './open-layer/services/draw-icon.service';
import { MAIN_MAP } from './open-layer/tokens/reference.token';
import { ReferenceService } from './open-layer/services/_index';
import { SIDEBAR_ANIMATION_SWITCHER } from './animation/animation-config';
import { CoordinatesService } from './open-layer/services/coordinate.service';
import { GEO_JSON_FEATURE_COLLECTION } from './open-layer/_types/geojson';
import { toStringHDMS } from 'ol/coordinate';
import { toLonLat } from 'ol/proj';
import { unByKey } from 'ol/Observable';
import { EventsKey } from 'ol/events';

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

  public contextMenuPosition = { x: 0, y: 0 };

  public coordinatesX: string = '00° 00′ 00″ С.Ш.';
  public coordinatesY: string = '00° 00′ 00″ В.Д.';

  public isOpenProperties: boolean = false;

  // Layers and Source
  private tileLayer = new TileLayer({source: new OSM()});
  private vectorSource = new VectorSource({wrapX: false});
  private vectorLayer = new VectorLayer({source: this.vectorSource});
  private jsonVectorSource = new VectorSource({
    features: new GeoJSON({
      featureProjection: 'EPSG:3857'
    }).readFeatures(GEO_JSON_FEATURE_COLLECTION)
  });
  private jsonLayer = new VectorLayer({
    source: this.jsonVectorSource,
  });

  // Select
  private selectInteraction!: Select;
  private selectStyle = new Style({
    stroke: new Stroke({
      color: '#64ff00',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(131,157,62, 0.5)',
    }),
  });

  // Popup
  @ViewChild('popup', {read: ElementRef, static: true}) public container!: ElementRef;
  public hdms!: string;
  private overlay!: Overlay;
  private singleClickEvent!: EventsKey;

  // LayerGroup
  private baseLayers!: LayerGroup;
  private rasterLayers!: LayerGroup;

  // Controls
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
    private drawGeometryService: DrawGeometryService,
    private readonly elementRef: ElementRef, // Мы получаем доступ к DOM элементам в это компоненте через DI.
    // указывает тип обьекта ссылку на который будем хранить в сервисе
    @Inject(MAIN_MAP) private mapRefService: ReferenceService<Map>,
    private drawIcon: DrawIconService,
    private coordinatesService: CoordinatesService,
  ) {}

  ngOnInit(): void {
    this.initAllMethodsForMap();
    // this.initLayersToMap();
    this.removeAction();
  }

  ngOnDestroy() {
    this.mapRefService.clear();
    this.coordinatesService.isPolygons.next(false);
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
    this.contextMenuPosition.x = event.clientX;
    this.contextMenuPosition.y = event.clientY;
    this.contextMenuMarcer.openMenu();
  }

/**
 * Анимация правой панели
 */
  public toggelPanel(): any {
    this.isOpenProperties = !this.isOpenProperties;
  }

  private initMap() {
    this.map = new Map({
      layers: [this.tileLayer, this.vectorLayer],
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

  public initKaluga() {
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
      // В BehaviorSubject нет необходимости, так как есть mapRefService
      // в котором хранится ссылка на карту
      // this.coordinatesService.coordinates$.next(event.coordinate);
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

/**
 * Метод для добавления изображения
 */
  public drawImage(iconType: string) {
    this.drawIcon.activate(iconType);
  }

  public removeAction() {
    this.map.getViewport().addEventListener('contextmenu', () => {
      this.drawIcon.deactivate();
      this.map.removeInteraction(this.drawGeometryService.drawGeometry);
    })
  }

/**
 * Метод для отрисовки геометрических фигур
 */
  public drawPolygon(type: any): any {
    this.drawGeometryService.createPolygon(type, this.map, this.vectorSource);
  }

/**
 * Метод для добавления geojson на карту
 */
  public addGeoJsonToMap(): any {
    this.map.addLayer(this.jsonLayer);
    this.selectFeatures();
  }

/**
 * Метод для выделения Features
 */
  private selectFeatures() {
    this.selectInteraction = this.select();
    this.map.addInteraction(this.selectInteraction);
  }

  private select(): Select {
    return new Select({
      condition: click,
      style: this.selectStyle,
    });
  }

/**
 * Метод для добавления и удаления popup
 */
  public addPopUp() {
    this.renderer.setStyle(this.container.nativeElement, 'display', 'block');
    this.overlay = new Overlay({
      element: this.container.nativeElement,
      autoPan: {
        animation: {
          duration: 200
        }
      }
    })

    this.singleClickEvent = this.map.on('singleclick', (event) => {
      const coordinate = event.coordinate;
      this.hdms = toStringHDMS(toLonLat(coordinate));
      this.overlay.setPosition(coordinate);
      this.map.addOverlay(this.overlay);
    });
  }

  public removePopup(): any {
    unByKey(this.singleClickEvent);
    this.overlay.setPosition(undefined);
    this.map.removeOverlay(this.overlay);
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




