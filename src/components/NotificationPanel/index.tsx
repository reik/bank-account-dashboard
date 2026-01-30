import React from 'react';
import { Drawer, Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const notifications = [
    { id: 1, message: 'Your checking account spending on groceries is higher than average.' },
    { id: 2, message: 'You have a new statement available.' },
    { id: 3, message: 'Savings account balance updated.' },
];

interface NotificationPanelProps {
    open: boolean;
    onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ open, onClose }) => (
    <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: 350, p: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h6">Notifications</Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>
            <List>
                {notifications.map((note) => (
                    <ListItem key={note.id}>
                        <ListItemText primary={note.message} />
                    </ListItem>
                ))}
            </List>
        </Box>
    </Drawer>
);

export default NotificationPanel;
