import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsInputsComponent } from './settings-inputs.component';

describe('SettingsInputsComponent', () => {
  let component: SettingsInputsComponent;
  let fixture: ComponentFixture<SettingsInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsInputsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
