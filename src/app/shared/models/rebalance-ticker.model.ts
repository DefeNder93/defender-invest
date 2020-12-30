export interface RebalanceTicker {
  name: string;
  weight: number;
  currentAmount:  number;
  currentPrice: number;
}

export interface RebalanceParams {
  rebalanceAmount: number;
  multiplier: number;
}

export interface RebalanceResult {
  name: string;
  additionalAmount: number;
  done: boolean;  // if rebalance for this ticker was completed
}

export interface RebalanceResultDone {
  name: string;
  done: boolean;  // if rebalance for this ticker was completed
}
