import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickersInputsComponent } from './tickers-inputs.component';

describe('TickersInputsComponent', () => {
  let component: TickersInputsComponent;
  let fixture: ComponentFixture<TickersInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickersInputsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickersInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
