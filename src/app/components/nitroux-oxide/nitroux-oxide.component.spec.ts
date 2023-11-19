import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NitrouxOxideComponent } from './nitroux-oxide.component';

describe('NitrouxOxideComponent', () => {
  let component: NitrouxOxideComponent;
  let fixture: ComponentFixture<NitrouxOxideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NitrouxOxideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NitrouxOxideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
