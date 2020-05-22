import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPanelComponent } from './property-panel.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'types/game-state.type';
import { MockComponent } from 'ng-mocks';
import { PropertyRowComponent } from 'components/property-row/property-row.component';

describe('PropertyPanelComponent', () => {
  let component: PropertyPanelComponent;
  let fixture: ComponentFixture<PropertyPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PropertyPanelComponent,
        MockComponent(PropertyRowComponent),
      ],
      providers: [
        provideMockStore({ initialState: { gameState: initialState } }),
      ],
    }).compileComponents();
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
