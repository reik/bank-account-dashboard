enum Categories {
    Entertainment = 'entertainment',
    Groceries = 'groceries',
    Utilities = 'utilities',
    Transportation = 'transportation',
    Dining = 'dining',
    Healthcare = 'healthcare',
    Other = 'other',
}

export type DebitTransaction = {
    type: 'debit';
    date: string;
    merchant: string;
    amount: number;
    category: Categories;
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
