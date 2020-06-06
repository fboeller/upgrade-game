import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkButtonComponent } from './work-button.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'types/game-state.type';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { ProgressBarComponent } from 'components/progress-bar/progress-bar.component';

describe('WorkButtonComponent', () => {
  let component: WorkButtonComponent;
  let fixture: ComponentFixture<WorkButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [WorkButtonComponent, MockComponent(ProgressBarComponent)],
      providers: [
        provideMockStore({ initialState: { gameState: initialState } }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
