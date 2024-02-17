import { Spread } from './spread.model';

export interface SpreadParams {
  dates: SpreadDates | null;
  spreads: Spread[] | null;
  settings: SpreadSettings | null;
}

export interface SpreadDates {
  startDate: string;
  endDate: string;
  firstYear: number;
  lastYear: number;
}

export interface SpreadSettings {
  normalize: boolean;
  percents: boolean;
  smaLen: string;
}
