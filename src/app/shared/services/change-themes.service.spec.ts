import { TestBed } from '@angular/core/testing';

import { ChangeThemesService } from './change-themes.service';

describe('ChangeThemesService', () => {
  let service: ChangeThemesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeThemesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
