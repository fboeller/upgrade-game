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
import { PowerupPanelComponent } from 'components/powerup-panel/powerup-panel.component';
import { PowerupRowComponent } from 'components/powerup-row/powerup-row.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { provideMockActions } from '@ngrx/effects/testing';
import { of } from 'rxjs';

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
        PowerupPanelComponent,
        PowerupRowComponent,
        WorkButtonComponent,
      ],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatProgressBarModule,
        MatIconModule,
        MatListModule,
      ],
      providers: [
        provideMockStore({ initialState: { gameState: initialState } }),
        provideMockActions(() => of()),
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
    component.powerups = [];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
