import React from 'react';
import { Alert, ListItem, ListItemText } from '@mui/material';
import { Notification as NotificationType } from './types';

export const renderNotification = (note: NotificationType, idx: number) => {
    switch (note.type) {
        case 'spendingCategoryWarnings':
            return (
                <Alert severity="warning" sx={{ mt: 2 }} className="spend-warn">
                    <ListItem key={`category-${idx}`}>
                        <ListItemText
                            primary="Spending by Category"
                            secondary={
                                <ul style={{ margin: 0, paddingLeft: 16, fontSize: '1rem' }}>
                                    {Object.entries(note.data).map(([category, amount]) => (
                                        <li key={category}>
                                            {category}: $
                                            {amount.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                            })}
                                        </li>
                                    ))}
                                </ul>
                            }
                        />
                    </ListItem>
                </Alert>
            );
        case 'spendingMerchantWarnings':
            return (
                <Alert severity="warning" sx={{ mt: 2 }} className="spend-warn">
                    <ListItem key={`merchant-${idx}`}>
                        <ListItemText
                            primary="Spending by Merchant"
                            secondary={
                                <ul style={{ margin: 0, paddingLeft: 16, fontSize: '1rem' }}>
                                    {Object.entries(note.data).map(([merchant, amount]) => (
                                        <li key={merchant}>
                                            {merchant}: $
                                            {amount.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                            })}
                                        </li>
                                    ))}
                                </ul>
                            }
                        />
                    </ListItem>
                </Alert>
            );
        case 'savingToInvestment':
            return (
                <Alert severity="success" sx={{ mt: 2 }} className="spend-warn">
                    <ListItem key={`investment-${idx}`} sx={{ fontSize: '1rem' }}>
                        <ListItemText
                            primary="Saving to Investment"
                            secondary={`You moved $${note.data.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} to ${note.data.investmentTarget}.`}
                        />
                    </ListItem>
                </Alert>
            );
        case 'recurringPaymentReminders':
            return (
                <Alert severity="success" sx={{ mt: 2 }} className="spend-warn">
                    <ListItem key={`recurring-${idx}`} sx={{ fontSize: '1rem' }}>
                        <ListItemText
                            primary="Recurring Payments"
                            secondary={
                                <ul style={{ margin: 0, paddingLeft: 16, fontSize: '1rem' }}>
                                    {note.data.map((reminder, i) => (
                                        <li key={reminder.bill + i}>
                                            {reminder.bill}: $
                                            {reminder.amount.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                            })}{' '}
                                            due on {reminder.dueDate}
                                        </li>
                                    ))}
                                </ul>
                            }
                        />
                    </ListItem>
                </Alert>
            );
        default:
            return null;
    }
};
