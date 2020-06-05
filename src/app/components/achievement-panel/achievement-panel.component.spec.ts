import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementPanelComponent } from './achievement-panel.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'types/game-state.type';
import { AchievementListComponent } from 'components/achievement-list/achievement-list.component';

describe('AchievementPanelComponent', () => {
  let component: AchievementPanelComponent;
  let fixture: ComponentFixture<AchievementPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AchievementPanelComponent, AchievementListComponent],
      providers: [
        provideMockStore({ initialState: { gameState: initialState } }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
