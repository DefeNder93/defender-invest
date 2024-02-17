import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpreadSettings } from '../../../../shared/models/spread-params.model';
import { SpreadParamsService } from '../../../../shared/services/spread-params.service';

@Component({
  selector: 'app-settings-inputs',
  templateUrl: './settings-inputs.component.html',
  styleUrls: ['./settings-inputs.component.scss'],
})
export class SettingsInputsComponent implements OnInit, OnDestroy {
  @Output() update = new EventEmitter<SpreadSettings>();

  form: FormGroup = this.fb.group({
    normalize: [false, Validators.required],
    percents: [false, Validators.required],
    smaLen: [false, Validators.required],
  });

  private onDestroy$: Subject<void> = new Subject();

  constructor(
    protected fb: FormBuilder,
    private paramsService: SpreadParamsService,
  ) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => this.form.valid && this.update.next(this.form.value));
    const params = this.paramsService.getSpreadParams();
    params?.settings && this.form.patchValue(params.settings);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
