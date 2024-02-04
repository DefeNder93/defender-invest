export interface ChardData {
  data: YearData[];
}

export interface YearData {
  year: string;
  spreads: ChardSpread[];
}

export interface ChardSpread {
  closes: number[];
  dates: string[];
}

export interface FEChardSpread {
  data: [string, number][]; // date, price
}
