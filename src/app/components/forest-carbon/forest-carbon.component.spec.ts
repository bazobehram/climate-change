import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForestCarbonComponent } from './forest-carbon.component';

describe('ForestCarbonComponent', () => {
  let component: ForestCarbonComponent;
  let fixture: ComponentFixture<ForestCarbonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForestCarbonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForestCarbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
