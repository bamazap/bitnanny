import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRecordComponent } from './select-record.component';

describe('SelectRecordComponent', () => {
  let component: SelectRecordComponent;
  let fixture: ComponentFixture<SelectRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
