import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoostPanelComponent } from './boost-panel.component';
import { BoostCardComponent } from 'components/boost-card/boost-card.component';
import { MockComponent } from 'ng-mocks';

describe('BoostPanelComponent', () => {
  let component: BoostPanelComponent;
  let fixture: ComponentFixture<BoostPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoostPanelComponent, MockComponent(BoostCardComponent)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoostPanelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.boosts = ['coffee'];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
