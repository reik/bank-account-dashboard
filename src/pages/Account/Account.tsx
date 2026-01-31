import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import transactionsData from '../../mocks/transactions.json';
import { DebitTransaction, Transaction } from './types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import { getMonthDateRange } from '../../utils';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Layout from '../../components/Layout';
import { useTheme } from '../../components/Theme/ThemeContext';

function getTransactionsForMonth(
    transactions: Transaction[],
    year: number,
    month: number
): Transaction[] {
    const { firstDay, lastDay } = getMonthDateRange(year, month);
    return transactions.filter((t: Transaction) => {
        const txDate = new Date(t.date);
        return !isNaN(txDate.getTime()) && txDate >= firstDay && txDate <= lastDay;
    });
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator<Key extends keyof Transaction>(order: 'asc' | 'desc', orderBy: Key) {
    return order === 'desc'
        ? (a: Transaction, b: Transaction) => descendingComparator(a, b, orderBy)
        : (a: Transaction, b: Transaction) => -descendingComparator(a, b, orderBy);
}

const sortableKeys: (keyof Transaction)[] = ['date', 'type', 'merchant', 'amount'];
const headCells = [
    { id: 'date', label: 'Date' },
    { id: 'type', label: 'Type' },
    { id: 'merchant', label: 'Merchant' },
    { id: 'amount', label: 'Amount' },
    { id: 'category', label: 'Category' },

    { id: 'location', label: 'Location' },
    { id: 'paymentMethod', label: 'Payment Method' },
    { id: 'recurring', label: 'Recurring' },
];

const Account: React.FC = () => {
    const { theme } = useTheme();
    const { accountNumber } = useParams();
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const [orderBy, setOrderBy] = useState<keyof Transaction>('date');
    const [rows, setRows] = useState<Transaction[]>([]);
    const [transactionMonth, setTransactionMonth] = useState<{ year: number; month: number }>(
        () => {
            const today = new Date();
            // Default to previous month
            const prevMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
            const year = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
            return { year, month: prevMonth };
        }
    );

    // Get all unique months in the data
    const allTransactions = (transactionsData as any[]).map((tx) => ({
        ...tx,
        amount: typeof tx.amount === 'string' ? Number(tx.amount) : tx.amount,
    })) as Transaction[];

    const uniqueMonths = Array.from(
        new Set(
            allTransactions.map((tx) => {
                const d = new Date(tx.date);
                return `${d.getFullYear()}-${d.getMonth()}`;
            })
        )
    )
        .map((str) => {
            const [year, month] = str.split('-').map(Number);
            return { year, month };
        })
        .sort((a, b) => (b.year !== a.year ? b.year - a.year : b.month - a.month));

    useEffect(() => {
        const filtered = getTransactionsForMonth(
            allTransactions,
            transactionMonth.year,
            transactionMonth.month
        );

        setRows(filtered);
    }, [transactionMonth]);

    const handleSort = (property: keyof Transaction) => {
        if (!sortableKeys.includes(property)) return;
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleMonthChange = (event: SelectChangeEvent<string>) => {
        const [year, month] = event.target.value.split('-').map(Number);
        setTransactionMonth({ year, month });
    };

    console.log('uniqueMonths!', uniqueMonths);

    return (
        <Layout>
            <div className={`account ${theme}`}>
                <Typography variant="h5" gutterBottom>
                    Account #{accountNumber} - Monthly Transactions
                </Typography>
                <FormControl
                    variant="outlined"
                    size="small"
                    style={{ minWidth: 200, marginBottom: 16 }}
                >
                    <InputLabel id="month-select-label">Select Month</InputLabel>
                    <Select
                        labelId="month-select-label"
                        value={`${transactionMonth.year}-${transactionMonth.month}`}
                        onChange={handleMonthChange}
                        label="Select Month"
                    >
                        {uniqueMonths.map(({ year, month }) => (
                            <MenuItem key={`${year}-${month}`} value={`${year}-${month}`}>
                                {`${year} - ${new Date(year, month).toLocaleString('default', { month: 'long' })}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {headCells.map((cell) => (
                                    <TableCell key={cell.id}>
                                        {sortableKeys.includes(cell.id as keyof Transaction) ? (
                                            <TableSortLabel
                                                active={orderBy === cell.id}
                                                direction={orderBy === cell.id ? order : 'asc'}
                                                onClick={() =>
                                                    handleSort(cell.id as keyof Transaction)
                                                }
                                            >
                                                {cell.label}
                                            </TableSortLabel>
                                        ) : (
                                            cell.label
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.sort(getComparator(order, orderBy)).map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.merchant}</TableCell>
                                    <TableCell>
                                        $
                                        {row.amount.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        {row.type === 'debit'
                                            ? (row as DebitTransaction).category
                                            : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {row.type === 'debit'
                                            ? (row as DebitTransaction).location
                                            : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {row.type === 'debit'
                                            ? (row as DebitTransaction).paymentMethod
                                            : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {row.type === 'debit'
                                            ? (row as DebitTransaction).recurring
                                                ? 'Yes'
                                                : 'No'
                                            : '-'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Layout>
    );
};

export default Account;
