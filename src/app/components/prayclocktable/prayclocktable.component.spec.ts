import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayclocktableComponent } from './prayclocktable.component';

describe('PrayclocktableComponent', () => {
  let component: PrayclocktableComponent;
  let fixture: ComponentFixture<PrayclocktableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrayclocktableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrayclocktableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
