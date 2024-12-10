"use client";

import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartOptions } from 'chart.js/auto';

const CarbonChart = () => {
    const [showRandomPoint, setShowRandomPoint] = useState(true);

    const mainLineData1 = Array.from({ length: 20 }, () => Math.random() * 50);
    const mainLineData2 = Array.from({ length: 20 }, () => Math.random() * 55);
    const randomPointData: number[] = [15];
    
    const data = {
        labels: Array.from({ length: 7 }, (_, i) => i.toString()),
        datasets: [
            {
                label: 'Produced',
                data: mainLineData1,
                borderColor: '#0D2A85',
                backgroundColor: 'rgba(13, 42, 133, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: 'rgba(13, 42, 133, 1)',
            },
            {
                label: 'Captured',
                data: mainLineData2,
                borderColor: '#136AF6',
                backgroundColor: 'transparent',
                fill: false,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#ffffff',
            },
            {
                label: 'Single Point',
                data: randomPointData,
                pointRadius: 7,
                pointHoverRadius: 12,
                borderColor: 'rgba(19, 106, 246, 1)',
                backgroundColor: 'rgba(19, 106, 246, 1)',
                pointBackgroundColor: 'rgba(19, 106, 246, 1)',
                showLine: false,
            },
        ],
    };
    
    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: true,
                title: {
                    display: false,
                },
                grid: {
                    display: false,
                },
            },
            y: {
                display: true,
                title: {
                    display: false,
                },
                ticks: {
                    stepSize: 10,
                },
                suggestedMax: 60,
            },
        },
        plugins: {
            tooltip: {
                enabled: true,
            },
            legend: {
                align: 'end',
                labels: {
                    boxHeight: 1,
                    padding: 30,
                    filter: (legendItem) => {
                        
                        return legendItem.text !== 'Single Point';
                    },
                },
            },
        },
    };

    return (
        <div className='rounded-[8px] shadow-custom md:p-6 p-3 mt-15 w-full'>
            <h2 className='text-2xl font-bold text-neutral-800'>Carbon Emissions</h2>
            <p className='text-neutral-400 text-sm'>as of 23 Nov 2022, 09:41 PM</p>
            <div className="h-[300px]">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default CarbonChart;
