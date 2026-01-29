import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

type SpendingCategory = {
    percent: number;
    amount: number;
    warning?: boolean;
};

type SpendingPastMonth = {
    [category: string]: SpendingCategory;
};

type SpendingAverage = {
    [category: string]: {
        percent?: number;
        amount: number;
    };
};

interface SpendingChartProps {
    spendingPastMonth: SpendingPastMonth;
    spendingAverage: SpendingAverage;
}

const COLORS = [
    '#b3c2d1', // subtle blue
    '#d1b3c2', // subtle purple
    '#d1c2b3', // subtle orange
    '#b3d1c2', // subtle green
    '#d1b3b3', // subtle red
    '#b3d1d1', // subtle teal
    '#d1d1b3', // subtle yellow
];

const SpendingChart: React.FC<SpendingChartProps> = ({ spendingPastMonth, spendingAverage }) => {
    if (!spendingPastMonth || !spendingAverage) return null;

    const categories = Object.keys(spendingPastMonth);

    const pastMonthPercents = categories.map((cat) => (spendingPastMonth[cat]?.percent ?? 0) * 100);
    const averagePercents = categories.map((cat) => (spendingAverage[cat]?.percent ?? 0) * 100);

    const pastMonthData = {
        labels: categories,
        datasets: [
            {
                label: 'Past Month (%)',
                data: pastMonthPercents,
                backgroundColor: COLORS,
            },
        ],
    };

    const averageData = {
        labels: categories,
        datasets: [
            {
                label: 'Average (%)',
                data: averagePercents,
                backgroundColor: COLORS,
            },
        ],
    };

    const baseOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `${context.dataset.label}: ${context.parsed}%`;
                    },
                },
            },
        },
    };

    const options = {
        ...baseOptions,

        plugins: {
            ...baseOptions.plugins,
            legend: {
                display: true,
                position: 'left' as const,
            },
        },
    };

    return (
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
            <div>
                <Pie data={pastMonthData} options={baseOptions} />
                <div style={{ textAlign: 'center', marginTop: 8 }}>Past Month (%)</div>
            </div>
            <div>
                <Pie data={averageData} options={options} />
                <div style={{ textAlign: 'center', marginTop: 8 }}>Average (%)</div>
            </div>
        </div>
    );
};

export { SpendingChart };
