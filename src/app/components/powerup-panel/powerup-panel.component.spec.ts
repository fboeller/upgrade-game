import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerupPanelComponent } from './powerup-panel.component';
import { PowerupRowComponent } from 'components/powerup-row/powerup-row.component';
import { MockComponent } from 'ng-mocks';

describe('PowerupPanelComponent', () => {
  let component: PowerupPanelComponent;
  let fixture: ComponentFixture<PowerupPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PowerupPanelComponent, MockComponent(PowerupRowComponent)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerupPanelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.powerups = ['coffee'];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
