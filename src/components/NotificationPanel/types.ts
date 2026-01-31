export type Notification =
    | {
          type: 'spendingCategoryWarnings';
          data: { [category: string]: number };
      }
    | {
          type: 'spendingMerchantWarnings';
          data: { [merchant: string]: number };
      }
    | {
          type: 'savingToInvestment';
          data: { amount: number; investmentTarget: string };
      }
    | {
          type: 'recurringPaymentReminders';
          data: { bill: string; dueDate: string; amount: number }[];
      };