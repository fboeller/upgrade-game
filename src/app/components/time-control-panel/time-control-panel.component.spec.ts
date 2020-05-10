import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeControlPanelComponent } from './time-control-panel.component';

describe('TimeControlPanelComponent', () => {
  let component: TimeControlPanelComponent;
  let fixture: ComponentFixture<TimeControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
