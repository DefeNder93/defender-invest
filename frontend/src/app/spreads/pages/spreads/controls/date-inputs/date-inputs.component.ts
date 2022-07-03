import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-inputs',
  templateUrl: './date-inputs.component.html',
  styleUrls: ['./date-inputs.component.scss']
})
export class DateInputsComponent implements OnInit {

  years = [
    1990,
    1991,
    1992,
    1993,
    1994,
    1995
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
