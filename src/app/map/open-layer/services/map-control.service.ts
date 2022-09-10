import { Inject, Injectable } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { SnackBarTypes } from 'src/app/shared/_models/snack-bar-types.enum';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { MINI_MAP } from '../tokens/reference.token';
import { ReferenceMiniMapService } from './referenceMiniMap.service';

@Injectable({
  providedIn: 'root'
})
export class MapControlService {
  public map!: Map;
  public isCliked: boolean = false;

  constructor(
    @Inject(MINI_MAP) private mapRefMiniMapService: ReferenceMiniMapService<Map>,
    private snackBarServive: SnackBarService,
  ) {}

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
      this.mapRefMiniMapService.set(this.map);
      this.mapRefMiniMapService.snapshot?.on('click', (event) => {
        this.openSnackBar(SnackBarTypes.Success, `${event.coordinate[0]}, ${event.coordinate[1]}`);
      });
    }, 100)
    this.isCliked = flag;
  }

  private openSnackBar(actionType: string, message: string): void {
    this.snackBarServive.openSnackBar({
      actionType,
      message,
    })
  }
}
