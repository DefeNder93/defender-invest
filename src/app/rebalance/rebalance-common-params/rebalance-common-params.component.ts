import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RebalanceParams} from "../../shared/models/rebalance-ticker.model";
import {Subject} from "rxjs";
import {debounceTime, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-rebalance-common-params',
  templateUrl: './rebalance-common-params.component.html',
  styleUrls: ['./rebalance-common-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RebalanceCommonParamsComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<void> = new Subject();

  public form: FormGroup = this.fb.group({
    rebalanceAmount: [null],
    multiplier: [1],
  });

  @Output() paramsUpdate = new EventEmitter<RebalanceParams>();
  @Input() initialParams: RebalanceParams | null = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.onDestroy$)
      )
      .subscribe((value) => this.paramsUpdate.next(value));
    this.initialParams && this.form.patchValue(this.initialParams);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
