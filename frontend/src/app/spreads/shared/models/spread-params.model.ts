import { Spread } from './spread.model';

export interface SpreadParams {
  dates: SpreadDates;
  spreads: Spread[];
  settings: SpreadSettings;
}

export interface SpreadDates {
  startDate: string;
  endDate: string;
  firstYear: string;
  lastYear: string;
}

export interface SpreadSettings {
  normalize: boolean;
  percents: boolean;
}
