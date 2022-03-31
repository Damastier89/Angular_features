import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { defaults , FullScreen, MousePosition, OverviewMap, ScaleLine, ZoomSlider, ZoomToExtent } from 'ol/control';
import 'ol/ol.css';
import { altKeyOnly } from 'ol/events/condition'; // import * as olEvents from 'ol/events';
import { Overlay, View } from 'ol';
import { Map } from 'ol';
import { DragRotate , Draw } from 'ol/interaction';
import { MapControlService } from '../openLayer/map-control.service';
import { DrawGeometryService } from '../openLayer/draw-geometry.service';
import { CoordinatesСity } from '../openLayer/_types/coordinates';
import GeoJSON from 'ol/format/GeoJSON';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('coordinates') coordinates?: any;
  public name: string = 'Map Viewer - Openlayers & Angular'
  public panelOpenState = false;
  public isMap: boolean = false;
  public map!: Map;
  public popup = new Overlay({
    element: this.coordinates,
  });

  public coordinatesX: string = '00° 00′ 00″ С.Ш.';
  public coordinatesY: string = '00° 00′ 00″ В.Д.';

  public scaleMap: any;

  public zoomToExtentControls = new ZoomToExtent();
  public zoomSliderControls = new ZoomSlider();
  public scaleLineControls = new ScaleLine();
  public fullScreenControl = new FullScreen();
  public mousePositionControl = new MousePosition();
  public overviewMapControl = new OverviewMap({
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
  ) {}

  ngOnInit(): void {
    this.initAllMethodsForMap();
  }

  public initAllMethodsForMap(): void {
    this.initMap();
    this.getCoordinateMouseOnMap();
    this.getCoordinateOnMap();
    this.dragRotateInteraction();
  }

  private initMap() {
    // this.mapControl.createMap('map', CoordinatesСity.KALUGA);
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
        // this.zoomSliderControls,
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

  private getCoordinateMouseOnMap(): void {
    this.map.on('pointermove', (event) => {
      this.coordinatesX = `${event.coordinate[0]}`;
      this.coordinatesY= `${event.coordinate[1]}`
    })
  }

  private getCoordinateOnMap(): void {
    this.map.on('click', (event) => {
      const clickedCoordinate = event.coordinate.join(', ');
      // this.renderer.setStyle(this.coordinates.nativeElement, 'color', 'blue');
      this.renderer.setProperty(this.coordinates.nativeElement, 'innerHTML', clickedCoordinate)
    })
  }
/////////// DragRotate Interaction ////////////

  private dragRotateInteraction(): void {
    const dragRotate = new DragRotate({
      // condition: altShiftKeysOnly,
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
      console.log(drawFeatures);
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

}
