import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePanelComponent } from './game-panel.component';
import { FundsPanelComponent } from 'components/funds-panel/funds-panel.component';
import { PropertyPanelComponent } from 'components/property-panel/property-panel.component';
import { TimeControlPanelComponent } from 'components/time-control-panel/time-control-panel.component';
import { WorkButtonComponent } from 'components/work-button/work-button.component';
import { personalProperties, businessProperties } from 'types/property.type';
import { BoostPanelComponent } from 'components/boost-panel/boost-panel.component';
import { MockComponent } from 'ng-mocks';

describe('GamePanelComponent', () => {
  let component: GamePanelComponent;
  let fixture: ComponentFixture<GamePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GamePanelComponent,
        MockComponent(FundsPanelComponent),
        MockComponent(WorkButtonComponent),
        MockComponent(PropertyPanelComponent),
        MockComponent(TimeControlPanelComponent),
        MockComponent(BoostPanelComponent),
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
    component.availablePersonalProperties = personalProperties;
    component.availableBusinessProperties = businessProperties;
    component.boosts = [];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
