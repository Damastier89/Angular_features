import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTabsComponent } from './angular-tabs.component';

describe('AngularTabsComponent', () => {
  let component: AngularTabsComponent;
  let fixture: ComponentFixture<AngularTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
