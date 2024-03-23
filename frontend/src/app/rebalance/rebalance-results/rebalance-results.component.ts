import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RebalanceResult } from '../../shared/models/rebalance-ticker.model';

@Component({
  selector: 'app-rebalance-results',
  templateUrl: './rebalance-results.component.html',
  styleUrls: ['./rebalance-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RebalanceResultsComponent {
  @Output() toggleDone = new EventEmitter();
  @Output() removeTask = new EventEmitter();

  @Input() rebalanceResults: RebalanceResult[] | null = [];

  abs = (value: number) => Math.abs(value);
}
