import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountSummaryData } from './types';
import summaryData from '../../mocks/summary.json';
import { SpendingChart } from '../SpendingChart';
import { BalanceChart } from '../BalanceChart';
import Alerts from '../SpendingWarnings';

const AccountSummary: React.FC = () => {
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
    }, []);

    if (loading) return <div>Loading account summary...</div>;

    // Find the checking account for the charts and warnings
    const checkingAccount = accounts.find((acc) => acc.type === 'Checking');

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={3}>
                {accounts.map((acc) => (
                    <Grid size={4} key={acc.accountNumber}>
                        <Card
                            variant="outlined"
                            sx={{ border: '1px solid', cursor: 'pointer' }}
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
                                    variant="h4"
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
                    <Grid size={4} key={acc.accountNumber + '-chart'}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="subtitle1" sx={{ marginBottom: '20px' }}>
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
                <Card sx={{ width: '100%', marginTop: '20px', border: '1px solid' }}>
                    <Grid container sx={{ paddingBottom: '20px' }}>
                        <Grid size={9}>
                            <Typography variant="h6" sx={{ margin: '20px' }}>
                                Spending Comparison (Past Month vs. Average)
                            </Typography>
                            <SpendingChart
                                spendingPastMonth={checkingAccount.spendingPastMonth}
                                spendingAverage={checkingAccount.spendingAverage}
                            />
                        </Grid>
                        <Grid size={3} alignItems="center" sx={{ padding: '20px' }}>
                            <Alerts spendingPastMonth={checkingAccount.spendingPastMonth} />
                        </Grid>
                    </Grid>
                </Card>
            )}
        </Box>
    );
};

export default AccountSummary;
