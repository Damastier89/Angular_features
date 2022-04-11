import { Inject, Injectable } from '@angular/core';
import { Map } from 'ol';
import { Draw } from 'ol/interaction';
import { Icon, Style } from 'ol/style';
import { MAIN_MAP } from '../tokens/reference.token';
import { ReferenceService } from './reference.service';
import { icons } from '../_types/icons';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

@Injectable({
  providedIn: 'root'
})
export class DrawIconService {
  public map!: Map | null;
  public layers: VectorLayer<VectorSource>[] = [];
  public draws: Draw[] = [];

  constructor(
    @Inject(MAIN_MAP) private mapRefService: ReferenceService<Map>,
  ) {
    this.mapRefService.reference$.subscribe(map => {
      if (map) {
        this.map = map;
        this.init();
        this.deactivate();
      }
    });
  }

  public activate(type: string) {
    this.draws.forEach(draw => {
      if (draw.get('iconType') === type) {
        draw.setActive(true);
      } else {
        draw.setActive(false);
      }
    });
  }

/**
 * В компоненет который будет использовать данный сервис,
 * можно вызвать данный метод, для возврата карты в исходное состояние.
 */
  public destroy() {
    this.layers.forEach(item => this.map?.removeLayer(item));
    this.layers = [];

    this.draws.forEach(item => this.map?.removeInteraction(item));
    this.draws = [];
  }

  public deactivate() {
    this.draws.forEach(draw => draw.setActive(false));
  }

  private init() {
    icons.forEach(icon => {
      const map = this.map;
      const style = this.createStyle(icon.source)
      // 1 создаем векторный источник (источник векторных обьектов(фичи))
      const source = this.createSource();
      // 2 создаем векторный слой и указываем ему путь на источник слоя и стиль
      const layer = this.createLayer(source, style);
      map!.addLayer(layer);

      // Храним ссылки на слои для последующего приведения карты в исходное состояние.
      this.layers.push(layer);

      const draw = this.createDraw(icon.type, source, style);

      map!.addInteraction(draw);
      this.draws.push(draw);

    });
  }

/**
 * Методы для источника векторных данных
*/
  private createSource(): VectorSource {
    return new VectorSource({ wrapX: true });
  }

/**
 * Методы для создания слоев векторных данных
*/
  private createLayer(source: VectorSource, style: Style): VectorLayer<VectorSource> {
    return new VectorLayer({
      source: source,
      style: style,
      zIndex: 1,
    });
  }

/**
 * Методы для отрисовки слоев
*/
  private createDraw(iconType: string, source: VectorSource, style: Style): Draw {
    const draw = new Draw({
      type: 'Point',
      style: style,
      source: source,
    })
    draw.set('iconType', iconType);

    return draw;
  }

  private createStyle(link: string) {
    return new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: link,
      }),
    })
  }
}
