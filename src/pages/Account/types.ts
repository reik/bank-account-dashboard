export type DebitTransaction = {
  type: 'debit';
  date: string;
  merchant: string;
  amount: number;
  category: string;
  location: string;
  paymentMethod: string;
  recurring: boolean;
};

export type CreditTransaction = {
  type: 'credit';
  date: string;
  merchant: string;
  amount: number;
};

export type Transaction = DebitTransaction | CreditTransaction;
