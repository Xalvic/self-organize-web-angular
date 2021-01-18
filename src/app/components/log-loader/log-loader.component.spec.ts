import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogLoaderComponent } from './log-loader.component';

describe('LogLoaderComponent', () => {
  let component: LogLoaderComponent;
  let fixture: ComponentFixture<LogLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
