import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePanelComponent } from './game-panel.component';
import { FundsPanelComponent } from 'components/funds-panel/funds-panel.component';
import { PropertyPanelComponent } from 'components/property-panel/property-panel.component';
import { PropertyRowComponent } from 'components/property-row/property-row.component';
import { TimeControlPanelComponent } from 'components/time-control-panel/time-control-panel.component';
import { WorkButtonComponent } from 'components/work-button/work-button.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'types/game-state.type';
import { personalProperties, businessProperties } from 'types/property.type';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('GamePanelComponent', () => {
  let component: GamePanelComponent;
  let fixture: ComponentFixture<GamePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GamePanelComponent,
        FundsPanelComponent,
        PropertyPanelComponent,
        PropertyRowComponent,
        TimeControlPanelComponent,
        WorkButtonComponent,
      ],
      imports: [NoopAnimationsModule],
      providers: [
        provideMockStore({ initialState: { gameState: initialState } }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePanelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.funds = 10;
    component.timeActive = true;
    component.becameAffordablePersonalProperties = personalProperties;
    component.becameAffordableBusinessProperties = businessProperties;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
