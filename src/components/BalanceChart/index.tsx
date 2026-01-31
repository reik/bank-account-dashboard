import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

type BalanceHistoryEntry = {
    date: string;
    balance: number;
};

interface BalanceChartProps {
    accountType: string;
    balanceHistory: BalanceHistoryEntry[];
}

const BalanceChart: React.FC<BalanceChartProps> = ({ accountType, balanceHistory }) => {
    if (!balanceHistory || balanceHistory.length === 0) return null;

    const color = accountType === 'Checking' ? '#1976d2' : '#9c27b0';
    const data = {
        labels: balanceHistory.map((entry) => entry.date),
        datasets: [
            {
                label: `${accountType} Balance`,
                data: balanceHistory.map((entry) => entry.balance),
                fill: false,
                borderColor: color,
                backgroundColor: color,
                tension: 0.2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as const,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `Balance: $${context.parsed.y.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Balance ($)',
                },
                beginAtZero: false,
            },
        },
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export { BalanceChart };
