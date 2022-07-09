import { Injectable } from '@angular/core';
import { Spread } from '../models/spread.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private readonly host = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {
  }

  getChartData = (spreads: Spread[]) => this.http.post(`${this.host}/chart-data`, { spreads });
}
