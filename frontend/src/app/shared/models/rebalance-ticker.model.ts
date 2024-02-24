export interface RebalanceTicker {
  name: string;
  weight: number;
  currentAmount: number;
  currentPrice: number;
  comparisonPrice: number | null;
}

export interface RebalanceParams {
  totalAmount: number;
  cash: number;
  multiplier: number;
  invested: number;
  rebalanceAmount: number;
}

export interface RebalanceResult {
  name: string;
  additionalAmount: number;
  done: boolean; // if rebalance for this ticker was completed
}

export interface RebalanceResultDone {
  name: string;
  done: boolean; // if rebalance for this ticker was completed
}
