import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularModalsComponent } from './angular-modals.component';

describe('AngularModalsComponent', () => {
  let component: AngularModalsComponent;
  let fixture: ComponentFixture<AngularModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularModalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
