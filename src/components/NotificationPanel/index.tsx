import React, { useEffect, useState } from 'react';
import {
    Alert,
    Drawer,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import notificationData from '../../mocks/notification.json';
import { Notification as NotificationType } from './types';

interface NotificationPanelProps {
    open: boolean;
    onClose: () => void;
}

const renderNotification = (note: NotificationType, idx: number) => {
    switch (note.type) {
        case 'spendingCategoryWarnings':
            return (
                <Alert severity="warning" sx={{ mt: 2 }} className="spend-warn">
                    <ListItem key={`category-${idx}`}>
                        <ListItemText
                            primary="Spending Warnings"
                            secondary={
                                <ul style={{ margin: 0, paddingLeft: 16 }}>
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
                            primary="Spending Warnings"
                            secondary={
                                <ul style={{ margin: 0, paddingLeft: 16 }}>
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
                <Alert severity="success" sx={{ mt: 2 }}>
                    <ListItem key={`investment-${idx}`}>
                        <ListItemText
                            primary="Saving to Investment"
                            secondary={`You moved $${note.data.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} to ${note.data.investmentTarget}.`}
                        />
                    </ListItem>
                </Alert>
            );
        case 'recurringPaymentReminders':
            return (
                <Alert severity="success" sx={{ mt: 2 }}>
                    <ListItem key={`recurring-${idx}`}>
                        <ListItemText
                            primary="Recurring Payment Reminders"
                            secondary={
                                <ul style={{ margin: 0, paddingLeft: 16 }}>
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

const NotificationPanel: React.FC<NotificationPanelProps> = ({ open, onClose }) => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setNotifications(notificationData as NotificationType[]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 350, p: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <Typography variant="h6">Notifications</Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <List>
                    {loading ? (
                        <ListItem>
                            <ListItemText primary="Loading..." />
                        </ListItem>
                    ) : (
                        notifications.map((note, idx) => renderNotification(note, idx))
                    )}
                </List>
            </Box>
        </Drawer>
    );
};

export default NotificationPanel;
