import { Injectable } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

@Injectable({
  providedIn: 'root'
})
export class MapControlService {
  public map!: Map;
  public isCliked: boolean = false;

  constructor() { }

  public createMap(target: string, coordinate: number[]): Map {
    return new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: coordinate,
          zoom: 10,
          maxZoom: 30,
          minZoom: 1,
        }),
        target: target,
        keyboardEventTarget: document
      });
  }

  public initNewCityOnMap(artibut: string, cordinates: number[], flag: boolean): void {
    setTimeout(() => {
      this.map = this.createMap(artibut, cordinates);
    }, 100)
    this.isCliked = flag;
  }
}
