import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountSummaryData, AccountSummaryProps } from './types';
import summaryData from '../../mocks/summary.json';
import { SpendingChart } from '../SpendingChart';
import { BalanceChart } from '../BalanceChart';
import SpendingWarnings from '../SpendingWarnings';

const AccountSummary: React.FC<AccountSummaryProps> = ({ username }) => {
    const [accounts, setAccounts] = useState<AccountSummaryData[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            setAccounts(summaryData);
            setLoading(false);
        }, 1000);
    }, [username]);

    if (loading) return <div className="account-summary">Loading account summary...</div>;

    // Find the checking account for the charts and warnings
    const checkingAccount = accounts.find((acc) => acc.type === 'Checking');

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={4}>
                {accounts.map((acc) => (
                    <Grid size={4} item key={acc.accountNumber}>
                        <Card
                            variant="outlined"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/account/${acc.accountNumber}`)}
                        >
                            <CardContent>
                                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                    {acc.type} Account
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
                    </Grid>
                ))}
                {accounts.map((acc) => (
                    <Grid item xs={12} md={6} key={acc.accountNumber + '-chart'}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {acc.type} Account Balance History
                                </Typography>
                                <BalanceChart
                                    accountType={acc.type}
                                    balanceHistory={acc.balanceHistory}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {checkingAccount?.spendingPastMonth && checkingAccount?.spendingAverage && (
                <Box sx={{ width: '100%' }}>
                    <Grid container>
                        <Grid size={9}>
                            <Typography variant="h6" gutterBottom>
                                Spending Comparison (Past Month vs. Average)
                            </Typography>
                            <SpendingChart
                                spendingPastMonth={checkingAccount.spendingPastMonth}
                                spendingAverage={checkingAccount.spendingAverage}
                            />
                        </Grid>
                        <Grid size={3}>
                            <SpendingWarnings
                                spendingPastMonth={checkingAccount.spendingPastMonth}
                            />
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Box>
    );
};

export default AccountSummary;
