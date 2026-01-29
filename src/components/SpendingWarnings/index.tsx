import React from 'react';
import { Alert, List, ListItem, ListItemText } from '@mui/material';

interface SpendingWarningsProps {
    spendingPastMonth: {
        [category: string]: {
            percent: number;
            amount: number;
            warning: boolean;
        };
    };
}

const SpendingWarnings: React.FC<SpendingWarningsProps> = ({ spendingPastMonth }) => {
    const warningCategories = Object.entries(spendingPastMonth)
        .filter(([_, value]) => value.warning)
        .map(([category, value]) => ({
            category,
            amount: value.amount,
        }));

    if (warningCategories.length === 0) return null;

    return (
        <Alert severity="warning" sx={{ mt: 2 }}>
            <strong>Spending Warning</strong>
            <List dense>
                {warningCategories.map(({ category, amount }) => (
                    <ListItem key={category} disablePadding>
                        <ListItemText
                            primary={`${category.charAt(0).toUpperCase() + category.slice(1)}: $${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Alert>
    );
};

export default SpendingWarnings;
