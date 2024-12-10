"use client";

import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartOptions } from 'chart.js/auto';

const ParticularChart = () => {
    const [showRandomPoint, setShowRandomPoint] = useState(true);

    const mainLineData = Array.from({ length: 20 }, () => Math.random() * 50);
    const mainLineData2 = Array.from({ length: 20 }, () => Math.random() * 50);
    const mainLineData3 = Array.from({ length: 20 }, () => Math.random() * 50);
    const randomPointData: number[] = [15];
    
    const data = {
        labels: Array.from({ length: 7 }, (_, i) => i.toString()),
        datasets: [
            {
                label: 'PM 10',
                data: mainLineData,
                borderColor: '#0D2A85',
                backgroundColor: 'transparent',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: 'rgba(19, 106, 246, 1)',
            },
            {
                label: 'PM 2.5',
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
                label: 'PM 1.0',
                data: mainLineData3,
                borderColor: '#B0D4FF', 
                backgroundColor: 'transparent', 
                fill: false, 
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#ffffff', 
            },
            {
                label: 'Captured',
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
                        return legendItem.text !== 'Captured';
                    },
                },
            },
        },
    };

    return (
        <div className='rounded-[8px] shadow-custom md:p-6 p-3 w-full'>
            <h2 className='text-2xl font-bold text-neutral-800'>Particular Matter Emissions</h2>
            <p className='text-neutral-400 text-sm'>as of 23 Nov 2022, 09:41 PM</p>
            <div className="h-[300px]">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default ParticularChart;
