import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import BingMaps from 'ol/source/BingMaps';
import TileDebug from 'ol/source/TileDebug';
import TileArcGISRest from 'ol/source/TileArcGISRest';
import TileWMS from 'ol/source/TileWMS';

/**
 * Ссылки на различные публичные карты и сервисы
 */
// https://www.esri.com/en-us/home
// http://sampleserver1.arcgisonline.com/ArcGIS/rest/services

// https://www.ogc.org/standards/wms

// https://search.usa.gov/search?affiliate=noaa.gov&query=nowCOAST

// https://github.com/CartoDB/basemap-styles - опции для стилей CartoDB
// https://wiki.openstreetmap.org/wiki/Tile_servers
// http://maps.stamen.com/#terrain/12/37.7706/-122.3782

export const LAYERS = {
	OSM_Standart: new TileLayer({
		source: new OSM(),
		visible: true,
		// Записываем новое свойство в обьект TileLayer для дальнейшего обращения к нему
		properties: { title: 'StreetMapStandart' },
	}),
	OSM_Humanitarian: new TileLayer({
		source: new OSM({
			url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
		}),
		properties: { title: 'OSMHumanitarian' },
	}),
	OSM_Transport: new TileLayer({
		source: new XYZ({
			url: 'http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png',
		}),
		visible: false,
		properties: { title: 'OSMTransport' },
	}),
	OSM_Cycle: new TileLayer({
		source: new OSM({
			url: 'http://tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
		}),
		visible: false,
		properties: { title: 'OSMCycle' },
	}),
	Stament_Terrain: new TileLayer({
		source: new XYZ({
			url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
			attributions: `Map tiles by <a href="http://stamen.com">Stamen Design</a>`,
		}),
		visible: false,
		properties: { title: 'StamenTerrain' },
	}),
	Green_Map: new TileLayer({
		source: new OSM({
			url: 'http://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
		}),
		visible: false,
		properties: { title: 'GreenMap' },
	}),
	Bing_Map: new TileLayer({
		source: new BingMaps({
			key: 'AjElKbKK7W-oLup0w-01uZoolG2mk7IwUa1e5pIVxaC2ySHvje1ESO7TmQ-r9_Xw',
			// Опция с описанием карты - Road, CanvasDark, CanvasGray, AerialWithLabels, Aerial
			imagerySet: 'AerialWithLabels',
		}),
		visible: false,
		properties: { title: 'BingMap' },
	}),
	CartoDB_Map: new TileLayer({
		source: new XYZ({
			url: 'https://{1-4}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png',
			attributions: `<a href="">© CARTO</a>`,
		}),
		visible: false,
		properties: { title: 'CartoMap' },
	}),
	Tile_Debug_Layer: new TileLayer({
		source: new TileDebug(),
		visible: false,
		properties: { title: 'TileDebugLayer' },
	}),
	// Tile ArcGIS REST API layer
	Tile_ArcGIS_REST_API_Layer: new TileLayer({
		source: new TileArcGISRest({
			url: 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer',
			attributions: '© ESRI and its data partners',
		}),
		opacity: 0.5,
		visible: false,
		properties: { title: 'TileArcGISRESTAPILayer' },
	}),
	NOAA_WMS_Layer: new TileLayer({
		source: new TileWMS({
			url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_dailymaxairtemp_offsets/MapServer/WMSServer?',
			params: {
				LAYERS: 1,
				FORMAT: 'image/png',
				TRANSPARENT: true,
			},
			attributions: `<a href=https://nowcoast.noaa.gov/>© NOAA<a/>`,
		}),
		visible: false,
		properties: { title: 'NOAAWMSLayer' },
	}),
};

/**
 * Может понадобиться
 */
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
