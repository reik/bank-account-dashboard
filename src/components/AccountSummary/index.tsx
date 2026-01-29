import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountSummaryData, AccountSummaryProps } from './types';
import summaryData from '../../mocks/summary.json';

const AccountSummary: React.FC<AccountSummaryProps> = ({ username }) => {
    const [accounts, setAccounts] = useState<AccountSummaryData[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            setAccounts(
                summaryData.map((acc) => ({
                    ...acc,
                    type: acc.type === 'Checking' ? 'Checking' : 'Saving',
                }))
            );
            setLoading(false);
        }, 1000);
    }, [username]);

    if (loading) return <div className="account-summary">Loading account summary...</div>;

    return (
        <div className="account-summary">
            <Grid container spacing={2}>
                {accounts.map((acc) => (
                    <Card
                        key={acc.accountNumber}
                        variant="outlined"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/account/${acc.accountNumber}`)}
                    >
                        <CardContent>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                {acc.type} Account
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Account Number
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                #{acc.accountNumber}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Balance
                            </Typography>
                            <Typography
                                variant="h5"
                                color={acc.type === 'Checking' ? 'primary' : 'secondary'}
                            >
                                $
                                {acc.balance.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                })}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </div>
    );
};

export default AccountSummary;
