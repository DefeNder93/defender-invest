import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {BehaviorSubject, pipe, Subject} from "rxjs";
import {RebalanceService} from "../rebalance.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-rebalance-ticker',
  templateUrl: './rebalance-ticker.component.html',
  styleUrls: ['./rebalance-ticker.component.scss']
})
export class RebalanceTickerComponent implements OnInit, OnDestroy {

  @Input() form: AbstractControl = new FormGroup({});
  @Input() index: number = 0;

  @Output() removeTicker = new EventEmitter();

  private onDestroy$: Subject<void> = new Subject();
  additionalAmount$ = new BehaviorSubject<number>(0);

  constructor(private rebalanceService: RebalanceService) { }

  ngOnInit() {
    this.rebalanceService.rebalance$.pipe(
      pipe(takeUntil(this.onDestroy$))
    ).subscribe((amount) => {
      const newAmount = Math.round(amount * this.form.value.weight / this.form.value.currentPrice);
      this.additionalAmount$.next(newAmount - this.form.value.currentAmount);
    });
  }

  public ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getFb = () => this.form as FormGroup;

}
