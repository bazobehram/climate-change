import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarIceCapsComponent } from './polar-ice-caps.component';

describe('PolarIceCapsComponent', () => {
  let component: PolarIceCapsComponent;
  let fixture: ComponentFixture<PolarIceCapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolarIceCapsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PolarIceCapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
