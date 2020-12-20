import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-rebalance-ticker',
  templateUrl: './rebalance-ticker.component.html',
  styleUrls: ['./rebalance-ticker.component.scss']
})
export class RebalanceTickerComponent implements OnInit {

  @Input() form: AbstractControl = new FormGroup({});
  @Input() index: number = 0;

  @Output() removeTicker = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getFb = () => this.form as FormGroup;

}
