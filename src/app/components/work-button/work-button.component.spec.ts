import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkButtonComponent } from './work-button.component';

describe('WorkButtonComponent', () => {
  let component: WorkButtonComponent;
  let fixture: ComponentFixture<WorkButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkButtonComponent ]
    })
    .compileComponents();
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
