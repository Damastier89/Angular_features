import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { Overlay } from 'ol';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewChecked {
  @ViewChild('coordinates',  { static: false }) coordinates?: any; 
  public map!: Map;
  public name: string = 'Map Viewer - Openlayers & Angular'
  public popup = new Overlay({
    element: this.coordinates,
  })

  constructor( 
    private readonly renderer: Renderer2, 
  ) {}

  ngOnInit(): void {
    this.initMap();
    this.getInfoAboutMap();
    this.getCoordinateOnMap();
  }

  ngAfterViewChecked(): void {
    // this.getCoordinateOnMap();
  }

  public initMap() {
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
    });
  }

  public getInfoAboutMap(): void {
    this.map.addOverlay(this.popup);
    this.map.on('click', (event) => {
      console.log(` event : `, event); 
    })
  }

  public getCoordinateOnMap(): void {
    this.map.on('click', (event) => {
      const clickedCoordinate = event.coordinate;
      const coordinateToString = clickedCoordinate.join(', ')

      console.log(` clickedCoordinate : `, clickedCoordinate); 
      console.log(` coordinateToString : `, coordinateToString); 

      this.popup.setPosition(undefined);
      this.popup.setPosition(clickedCoordinate);

      const divСoordinate = this.renderer.createElement('p');
      const textСoordinate = this.renderer.createText(coordinateToString);
      
      console.log(`divСoordinate : `, divСoordinate);
      
      this.renderer.appendChild(divСoordinate, textСoordinate)
      // this.renderer.appendChild(this.coordinates.nativeElement, textСoordinate)
      this.renderer.setStyle(this.coordinates.nativeElement, 'color', 'blue');
      this.renderer.setProperty(this.coordinates.nativeElement, 'innerHTML', textСoordinate)
      
      
    })
  }

  // https://www.tektutorialshub.com/angular/renderer2-angular/
}
