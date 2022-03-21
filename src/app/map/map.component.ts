import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map!: Map;
  name: string = 'Map Viewer - Openlayers & Angular'

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  public initMap() {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 1,
        maxZoom: 100,
        minZoom: 1,
        // rotation: 0.5
        // extent: [-513321, 643842, 467474, 4904590,]
      }),
      target: 'map',
    });
  }

}
