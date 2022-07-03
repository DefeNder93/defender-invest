// TODO implement
export interface SpreadParams {
  dates: SpreadDates;
  tickers: string[];
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
