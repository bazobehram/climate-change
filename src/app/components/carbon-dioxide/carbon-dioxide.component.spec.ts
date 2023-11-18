import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonDioxideComponent } from './carbon-dioxide.component';

describe('CarbonDioxideComponent', () => {
  let component: CarbonDioxideComponent;
  let fixture: ComponentFixture<CarbonDioxideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarbonDioxideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarbonDioxideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
