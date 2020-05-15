import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { TimeControlPanelComponent } from './time-control-panel.component';
import { initialState } from 'types/game-state.type';

describe('TimeControlPanelComponent', () => {
  let component: TimeControlPanelComponent;
  let fixture: ComponentFixture<TimeControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeControlPanelComponent],
      providers: [provideMockStore({ initialState: { gameState: initialState } })],
    }).compileComponents();
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
