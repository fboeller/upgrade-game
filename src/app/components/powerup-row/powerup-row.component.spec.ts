import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerupRowComponent } from './powerup-row.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'types/game-state.type';

describe('PowerupRowComponent', () => {
  let component: PowerupRowComponent;
  let fixture: ComponentFixture<PowerupRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PowerupRowComponent],
      providers: [
        provideMockStore({ initialState: { gameState: initialState } }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerupRowComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.powerup = 'coffee';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
