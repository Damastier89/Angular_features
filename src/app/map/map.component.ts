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
import  map  from 'ol/Map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewChecked {
  @ViewChild('coordinates') coordinates?: any; 
  public panelOpenState = false;
  public map!: Map;
  public name: string = 'Map Viewer - Openlayers & Angular'
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
      keyboardEventTarget: document 
    });
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

  public saveGeoJson(): void {
  //   var json = new GeoJSON();
  //   json.writeFeatures(vectorLayer.getSource().getFeatures(), { 
  //     dataProjection: 'EPSG:4326', 
  //     featureProjection: 'EPSG:3857'
  //   });
  //   this.download(json, 'json.txt' , 'text/plain');
  // }

  // public download(content: BlobPart, fileName: string, contentType: any): any {

  //   var a = document.createElement("a");

  //   var file = new Blob([content], {type: contentType});

  //   a.href = URL.createObjectURL(file);

  //   a.download = fileName;

  //   a.click();

  }

}
