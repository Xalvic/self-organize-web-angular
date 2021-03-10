import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogtimerComponent } from './logtimer.component';

describe('LogtimerComponent', () => {
  let component: LogtimerComponent;
  let fixture: ComponentFixture<LogtimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogtimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogtimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
