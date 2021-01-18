import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiorecordComponent } from './audiorecord.component';

describe('AudiorecordComponent', () => {
  let component: AudiorecordComponent;
  let fixture: ComponentFixture<AudiorecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudiorecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiorecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
