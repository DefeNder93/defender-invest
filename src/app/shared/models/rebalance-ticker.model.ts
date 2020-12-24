export interface RebalanceTicker {
  name: string;
  weight: number;
  currentAmount:  number;
  currentPrice: number;
}

export interface RebalanceParams {
  rebalanceAmount: number;
}
