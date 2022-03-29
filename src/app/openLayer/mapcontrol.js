/**
 * @file
 * Объект, предоставляющий глобальные объекты и функции для работы с картой,
 * которые не зависят от текущего запущенного приложения
 */
import Map from 'ol/Map';

export const map = new Map();

function initMap(target) {
  map({
      layers: [
        new ol.TileLayer({
          source: new ol.source.OSM(),
        }),
      ],
      view: new ol.View({
        center: [4038149.328674209, 7271086.0671555335],
        zoom: 10,
        maxZoom: 30,
        minZoom: 1,
      }),
      target: target,
      keyboardEventTarget: document 
    });
}

export { initMap } ;