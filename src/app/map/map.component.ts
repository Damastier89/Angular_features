import { AfterViewChecked, AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import 'ol/ol.css';
import { altKeyOnly, altShiftKeysOnly } from 'ol/events/condition'; // import * as olEvents from 'ol/events';
import { Overlay } from 'ol';
import { Map, View } from 'ol';
import { DragRotate , Draw } from 'ol/interaction';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import * as olControl from 'ol/control';
import { defaults , FullScreen, MousePosition, OverviewMap, ScaleLine, ZoomSlider, ZoomToExtent } from 'ol/control';

// import initMap from '../openLayer/mapcontrol.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewChecked {
  @ViewChild('coordinates') coordinates?: any; 
  public name: string = 'Map Viewer - Openlayers & Angular'
  public panelOpenState = false;
  isMap: boolean = false;
  public map!: Map;
  public popup = new Overlay({
    element: this.coordinates,
  });

  constructor( 
    private readonly renderer: Renderer2, 
  ) {}

  ngOnInit(): void {
    this.initAllMethodsForMap();
  }

  ngAfterViewChecked(): void {
    // this.getCoordinateOnMap();
  }

  public initAllMethodsForMap(): void {
    this.initMap();
    this.getInfoAboutMap();
    this.getCoordinateOnMap();
    this.dragRotateInteraction();
  }

  private initMap() {
    const zoomToExtentControls = new ZoomToExtent();
    const zoomSliderControls = new ZoomSlider();
    const scaleLineControls = new ScaleLine();
    const fullScreenControl = new FullScreen();
    const mousePositionControl = new MousePosition();
    const overviewMapControl = new OverviewMap({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
    });

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
        fullScreenControl,
        mousePositionControl,
        overviewMapControl,
        scaleLineControls,
        zoomSliderControls,
        zoomToExtentControls,
      ])
    });

    console.log(`defaults() : `, defaults());
    
  }

  private getInfoAboutMap(): void {
    // this.map.addOverlay(this.popup);
    this.map.on('click', (event) => {
      console.log(` event : `, event); 
    })
  }

  private getCoordinateOnMap(): void {
    this.map.on('click', (event) => {
      const clickedCoordinate = event.coordinate;
      const coordinateToString = clickedCoordinate.join(', ')

      // this.popup.setPosition(undefined);
      // this.popup.setPosition(clickedCoordinate);

      this.renderer.setStyle(this.coordinates.nativeElement, 'color', 'blue');
      this.renderer.setProperty(this.coordinates.nativeElement, 'innerHTML', coordinateToString)

    })
  }
/////////// DragRotate Interaction ////////////

  private dragRotateInteraction(): void {
    const dragRotate = new DragRotate({
      condition: altShiftKeysOnly,
      // condition: altKeyOnly, 
    })
    this.map.addInteraction(dragRotate);
  }

  public drawInteraction(): void {
    const drawInteraction = new Draw({ // Для рисования геометрии элементов
// The geometry type.'Point', 'LineString', 'LinearRing', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon', 'GeometryCollection', 'Circle'      
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

  public drawPolygon(): void {
    const drawPolygon = new Draw({
      type: 'Polygon'
    });
    this.map.addInteraction(drawPolygon);
  }

  public drawCircle(): void {
    const drawCircle = new Draw({
      type: 'Circle'
    });
    this.map.addInteraction(drawCircle);
  }

  public closeMap() {}
  public initMoscow(){}
  initTula(){}
  drawMultiPolygon(){}
  drawPoint(){}
  drawMultiPoint(){}
  drawLineString(){}
  drawLinearRing(){}
  drawMultiLineString(){}
  drawGeometryCollection(){}
}
