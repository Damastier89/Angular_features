import { Injectable } from '@angular/core';
import { Map } from 'ol';
import { Draw } from 'ol/interaction';
import VectorSource from 'ol/source/Vector';

@Injectable({
  providedIn: 'root'
})
export class DrawGeometryService {
  public drawGeometry!: Draw;

  constructor() { }

  public createPolygon(type: any, map: Map, source: VectorSource) {
    this.drawGeometry = new Draw({
      source: source,
      type: type,
    })
    map.addInteraction(this.drawGeometry);
  }
}