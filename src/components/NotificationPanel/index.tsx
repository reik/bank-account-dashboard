import React, { useEffect, useState } from 'react';
import { Drawer, Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import notificationData from '../../mocks/notification.json';
import { Notification as NotificationType } from './types';
import { renderNotification } from './helper';

interface NotificationPanelProps {
    open: boolean;
    onClose: () => void;
}

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
