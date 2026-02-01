import React from 'react';
import { Alert, Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import './SpendingWarnings.css';

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
        <Box>
            <Typography variant="h6" sx={{ color: '#965b03ff' }}>
                Spending Warning
            </Typography>
            <Alert severity="warning" sx={{ mt: 2 }} className="spend-warn">
                {warningCategories.map(({ category, amount }) => (
                    <ListItem key={category} disablePadding>
                        <ListItemText
                            primary={`${category.charAt(0).toUpperCase() + category.slice(1)}: $${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                        />
                    </ListItem>
                ))}
            </Alert>
        </Box>
    );
};

export default SpendingWarnings;
