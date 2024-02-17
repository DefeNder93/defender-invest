import { RebalanceParams, RebalanceTicker } from './shared/models/rebalance-ticker.model';

export const InitialData: {
  rebalanceTickers: RebalanceTicker[];
  rebalanceParams: RebalanceParams;
} = {
  rebalanceTickers: [
    { name: 'AAPL', weight: 0.2, currentAmount: 77, currentPrice: 182.31, comparisonPrice: null },
    { name: 'MSFT', weight: 0.3, currentAmount: 52, currentPrice: 404.06, comparisonPrice: null },
    { name: 'AMZN', weight: 0.2, currentAmount: 83, currentPrice: 169.51, comparisonPrice: null },
    { name: 'INTC', weight: 0.2, currentAmount: 322, currentPrice: 43.51, comparisonPrice: null },
    { name: 'NVDA', weight: 0.1, currentAmount: 10, currentPrice: 726.13, comparisonPrice: null },
  ],
  rebalanceParams: {
    totalAmount: 100000,
    cash: 30000,
    invested: 70000,
    multiplier: 1,
    rebalanceAmount: 70000,
  },
};
