import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { defaults , FullScreen, OverviewMap, ScaleLine, ZoomToExtent } from 'ol/control';
import 'ol/ol.css';
import { altKeyOnly } from 'ol/events/condition'; // import * as olEvents from 'ol/events';
import { Overlay, View } from 'ol';
import { Map } from 'ol';
import { DragRotate , Draw } from 'ol/interaction';
import { MapControlService } from '../openLayer/map-control.service';
import { DrawGeometryService } from '../openLayer/draw-geometry.service';
import { CoordinatesСity } from '../openLayer/_types/coordinates';
import { MatMenuTrigger } from '@angular/material/menu';
import { LAYERS } from '../openLayer/_types/layers';
import GeoJSON from 'ol/format/GeoJSON';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerGroup from 'ol/layer/Group';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  @ViewChild('coordinates') coordinates?: any;
  public name: string = 'Map Viewer - Openlayers & Angular'
  public panelOpenState = false;
  public isMap: boolean = false;
  public map!: Map;
  public popup = new Overlay({
    element: this.coordinates,
  });

  public contextMenuPosition = { x: 0, y: 0 };

  public coordinatesX: string = '00° 00′ 00″ С.Ш.';
  public coordinatesY: string = '00° 00′ 00″ В.Д.';

  private baseLayers!: LayerGroup;
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
    private readonly renderer: Renderer2,
    private mapControl: MapControlService,
    private drawGeometry: DrawGeometryService,
    private readonly elementRef: ElementRef, // Мы получаем доступ к DOM элементам в это компоненте через DI.
  ) {}

  ngOnInit(): void {
    this.initAllMethodsForMap();
    this.initBaseLayerToMap();
  }

  public initAllMethodsForMap(): void {
    this.initMap();
    this.getCoordinateMouseOnMap();
    this.getCoordinateOnMapToClick();
    this.dragRotateInteraction();
  }

  public onContextMenu(event: MouseEvent){
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

  private initMap() {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [4038149.328674209, 7271086.0671555335],
        zoom: 10,
        maxZoom: 30,
        minZoom: 1,
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
  }

  public initMoscow() {
    this.mapControl.initNewCityOnMap('msc', CoordinatesСity.MOSCOW, true)
    this.closeMap();
    this.isMap = this.mapControl.isCliked
  }

  public initTula() {
    this.mapControl.initNewCityOnMap('msc', CoordinatesСity.TULA, true)
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
      this.coordinatesY= `${event.coordinate[1]}`
    })
  }

/**
 * Метод для получения координат по клику мыши на карту
 */
  private getCoordinateOnMapToClick(): void {
    this.map.on('click', (event) => {
      const clickedCoordinate = event.coordinate.join(', ');
      this.renderer.setProperty(this.coordinates.nativeElement, 'innerHTML', clickedCoordinate)
    })
  }

/**
 * DragRotate Interaction 
 */
  private dragRotateInteraction(): void {
    const dragRotate = new DragRotate({
      condition: altKeyOnly,
    })
    this.map.addInteraction(dragRotate);
  }

  public drawInteraction(): void {
    const drawInteraction = new Draw({ // Для рисования геометрии элементов
      type: 'Polygon',
      freehand: true // Позволяет рисовать полигон не прямыми линиями
    })
    this.map.addInteraction(drawInteraction);
    drawInteraction.on('drawend', (event) => {
      console.log(event);
      let parser = new GeoJSON();
      let drawFeatures = parser.writeFeaturesObject([event.feature]);
      // console.log(drawFeatures);
    });
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
 * Метод для переключения базовых слоёв
 */

/**
 * Установка конкретного слоя
 * @param event - выбранный чек-бокс
 */
  public switchBaseLayer(event: any): void {
    this.baseLayers.getLayersArray().forEach( layer => {
      layer.setVisible(layer.get('title') === event.value)
    })
  }

/**
 * Записываем созданные слои в глобальную переменную(для сохранения ссылки)
 * Добавляем полученные слои на карту
 */
  private initBaseLayerToMap() {
    this.baseLayers = this.createTileLayersGroup()
    this.map.addLayer(this.baseLayers)
  }

  private createTileLayersGroup() {
    const baseLayerGroup = new LayerGroup({
      layers: [
        LAYERS.OSM_Humanitarian,
        LAYERS.OSM_Standart,
        LAYERS.OSM_Transport,
        LAYERS.OSM_Cycle,
        LAYERS.Stament_Terrain,
        LAYERS.Hill_Shading_Map,
        LAYERS.Shades_Grey_Map,
        LAYERS.Green_Map,
      ]
    });

    return baseLayerGroup;
  }

}




