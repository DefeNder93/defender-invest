import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {RebalanceResult} from "../../shared/models/rebalance-ticker.model";

@Component({
  selector: 'app-rebalance-results',
  templateUrl: './rebalance-results.component.html',
  styleUrls: ['./rebalance-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RebalanceResultsComponent implements OnInit {

  @Output() toggleDone = new EventEmitter();

  @Input() rebalanceResults: RebalanceResult[] | null = [];

  constructor() { }

  ngOnInit() {
  }

}
