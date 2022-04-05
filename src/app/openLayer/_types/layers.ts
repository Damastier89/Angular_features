import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";

// https://wiki.openstreetmap.org/wiki/Tile_servers

export const LAYERS = {
  'OSM_Standart': new TileLayer({
    source: new OSM(),
    visible: false,
    // Записываем новое свойство в обьект TileLayer для дальнейшего обращения к нему
    properties: {'title': 'StreetMapStandart'}
  }),
  'OSM_Humanitarian': new TileLayer({
    source: new OSM({
      url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    }),
    visible: false,
    properties: {'title': 'OSMHumanitarian'}
  }),
  'OSM_Transport': new TileLayer({
    source: new XYZ({
      url: 'http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png' 
    }),
    visible: false,
    properties: {'title': 'OSMTransport'}
  }),
  'OSM_Cycle': new TileLayer({
    source: new OSM({
      url: 'http://tile.thunderforest.com/cycle/{z}/{x}/{y}.png' 
    }),
    visible: false,
    properties: {'title': 'OSMCycle'}
  }),
  'Stament_Terrain': new TileLayer({
    source: new XYZ({
      url: "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",
      attributions: `Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.`
    }),
    visible: false,
    properties: {'title': 'StamenTerrain'}
  }),
  'Green_Map': new TileLayer({
    source: new OSM({
      url: 'http://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png' 
    }),
    visible: false,
    properties: {'title': 'GreenMap'}
  }),
  'Hill_Shading_Map': new TileLayer({
    source: new OSM({
      url: 'https://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png' 
    }),
    visible: false,
    properties: {'title': 'HillShading'}
  }),
  'Shades_Grey_Map': new TileLayer({
    source: new OSM({
      url: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png' 
    }),
    visible: false,
    properties: {'title': 'ShadesGreyMap'}
  })
}


// const openStreetMapStandart = new TileLayer({
//   source: new OSM(),
//   visible: true,
//   // Записываем новое свойство в обьект TileLayer для дальнейшего обращения к нему
//   properties: {'title': 'StreetMapStandart'}
// })

// const openStreetMapHumanitarian = new TileLayer({
//   source: new OSM({
//     url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
//   }),
//   visible: false,
//   // properties: {'title': 'OSMHumanitarian'}
// });
// // Для динамической записи можно воспользоваться свойством set
// openStreetMapHumanitarian.set('title', 'OSMHumanitarian')

// const stamentTerrain =  new TileLayer({
//   source: new XYZ({
//     url: "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",
//     attributions: `Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.`
//   }),
//   visible: false,
//   properties: {'title': 'StamenTerrain'}
// });

// const openStreetMapTransport = new TileLayer({
//   source: new OSM({
//     url: 'http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png' 
//   }),
//   visible: false,
//   properties: {'title': 'OSMTransport'}
// })

// const openStreetMapCycle = new TileLayer({
//   source: new OSM({
//     url: 'http://tile.thunderforest.com/cycle/{z}/{x}/{y}.png' 
//   }),
//   visible: false,
//   properties: {'title': 'OSMCycle'}
// })

// const hillShadingMap = new TileLayer({
//   source: new OSM({
//     url: 'https://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png' 
//   }),
//   visible: false,
//   properties: {'title': 'HillShading'}
// })

// const shadesGreyMap = new TileLayer({
//   source: new OSM({
//     url: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png' 
//   }),
//   visible: false,
//   properties: {'title': 'ShadesGreyMap'}
// })

// const greenMap = new TileLayer({
//   source: new OSM({
//     url: 'http://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png' 
//   }),
//   visible: false,
//   properties: {'title': 'GreenMap'}
// })