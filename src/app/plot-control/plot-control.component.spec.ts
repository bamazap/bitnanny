import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotControlComponent } from './plot-control.component';

describe('PlotControlComponent', () => {
  let component: PlotControlComponent;
  let fixture: ComponentFixture<PlotControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
