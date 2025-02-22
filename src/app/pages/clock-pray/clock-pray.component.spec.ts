import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockPrayComponent } from './clock-pray.component';

describe('ClockPrayComponent', () => {
  let component: ClockPrayComponent;
  let fixture: ComponentFixture<ClockPrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockPrayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockPrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
