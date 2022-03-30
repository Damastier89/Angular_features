import { Injectable } from '@angular/core';
import { Map } from 'ol';
import { Draw } from 'ol/interaction';

@Injectable({
  providedIn: 'root'
})
export class DrawGeometryService {

  constructor() { }

  public createPolygon(map: Map) {
    const drawPolygon = new Draw({
      type: 'Polygon'
    })
    map.addInteraction(drawPolygon);
  }

  public createMultiPolygon(map: Map) {
    const drawMultiPolygon = new Draw({
      type: 'MultiPolygon'
    })
    map.addInteraction(drawMultiPolygon);
  }

  public createCircle(map: Map) {
    const drawCircle = new Draw({
      type: 'Circle'
    })
    map.addInteraction(drawCircle);
  }

  public createPoint(map: Map) {
    const drawPoint = new Draw({
      type: 'Point'
    })
    map.addInteraction(drawPoint);
  }

  public createMultiPoint(map: Map) {
    const drawMultiPoint= new Draw({
      type: 'MultiPoint'
    })
    map.addInteraction(drawMultiPoint);
  }

  public createLineString(map: Map) {
    const drawLineString = new Draw({
      type: 'LineString'
    })
    map.addInteraction(drawLineString);
  }

  public createLinearRing(map: Map) {
    const drawLinearRing = new Draw({
      type: 'LinearRing'
    })
    map.addInteraction(drawLinearRing);
  }

  public createMultiLineString(map: Map) {
    const drawMultiLineString = new Draw({
      type: 'MultiLineString'
    })
    map.addInteraction(drawMultiLineString);
  }

  public createGeometryCollection(map: Map) {
    const drawGeometryCollection= new Draw({
      type: 'GeometryCollection'
    })
    map.addInteraction(drawGeometryCollection);
  }




}
