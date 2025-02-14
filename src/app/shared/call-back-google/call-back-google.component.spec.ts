import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallBackGoogleComponent } from './call-back-google.component';

describe('CallBackGoogleComponent', () => {
  let component: CallBackGoogleComponent;
  let fixture: ComponentFixture<CallBackGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallBackGoogleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallBackGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
