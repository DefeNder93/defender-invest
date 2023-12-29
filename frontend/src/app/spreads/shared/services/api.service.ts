import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpreadParams } from '../models/spread-params.model';
import { ChardData } from '../models/spread-response.model';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private readonly host = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {
  }

  getChartData = (params: SpreadParams) => this.http.post<ChardData>(`${this.host}/chart-data`, params);

  getTickers = () => this.http.get<{tickers: string[]}>(`${this.host}/tickers`);
}
