export interface AccountSummaryData {
  type: string;
  accountNumber: string;
  balance: number;
  spendingPastMonth?: { [category: string]: { percent: number; amount: number; warning: boolean } };
  spendingAverage?: { [category: string]: { percent: number; amount: number } };
  balanceHistory: { date: string; balance: number }[];
}

export interface AccountSummaryProps {
  username: string;
}
