import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPanelComponent } from './property-panel.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/types/game-state.type';

describe('PropertyPanelComponent', () => {
  let component: PropertyPanelComponent;
  let fixture: ComponentFixture<PropertyPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyPanelComponent ],
      providers: [provideMockStore({ initialState: { gameState: initialState } })],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
