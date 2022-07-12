export interface ChardData {
  spreads: ChardSpread[];
}

export interface ChardSpread {
  data: [string, number][];  // date, price
}
