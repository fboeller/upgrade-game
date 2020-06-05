import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeCardComponent } from './upgrade-card.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'types/game-state.type';

describe('UpgradeCardComponent', () => {
  let component: UpgradeCardComponent;
  let fixture: ComponentFixture<UpgradeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpgradeCardComponent],
      providers: [
        provideMockStore({ initialState: { gameState: initialState } }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.upgrade = { property: 'salary', level: 0 };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
