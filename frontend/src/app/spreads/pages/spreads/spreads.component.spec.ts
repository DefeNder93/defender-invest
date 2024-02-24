import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadsComponent } from './spreads.component';

describe('SpreadsComponent', () => {
  let component: SpreadsComponent;
  let fixture: ComponentFixture<SpreadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpreadsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
