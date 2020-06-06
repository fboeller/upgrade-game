import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoostCardComponent } from './boost-card.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'types/game-state.type';

describe('BoostCardComponent', () => {
  let component: BoostCardComponent;
  let fixture: ComponentFixture<BoostCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoostCardComponent],
      providers: [
        provideMockStore({ initialState: { gameState: initialState } }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoostCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.boost = 'coffee';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
