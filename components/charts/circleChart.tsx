"use client"

import { CircleChartProps, EmissionPercentageProps, EmissionTonsProps } from '@/constants/types';
import React, { useState } from 'react'
import { Doughnut } from 'react-chartjs-2';

const options2 = {
    responsive: true,
    plugins: {
    legend: {
        display: false,
    },
    tooltip: {
        callbacks: {
        label: (context: any) => {
            let label = context.label || '';
            if (context.parsed !== null) {
            label += ': ' + context.parsed;
            }
            return label;
        },
        },
    },
    datalabels: {
        display: true,
        align: 'center',
        color: 'black',
        font: {
        weight: 'bold',
        size: 16,
        },
        formatter: (value: number, context: any) => {
        const total = context.dataset.data.reduce((acc: number, curr: number) => acc + curr, 0);
        const percentage = ((value / total) * 100).toFixed(2);
        return percentage + '%';
        },
    },
    },
    cutout: '70%',
    borderRadius: 10,
};

const CircleChart: React.FC<CircleChartProps> = ({ EmissionTons, EmissionPercentage }) => {
  const [unit, setUnit] = useState('T')
  const doughnutData1 = {
    labels: ['Stationary', 'Mobile', 'Refrigerants', 'Biogenic'],
    datasets: [
    {
        label: 'Dataset 1',
        data: unit === 'T'
        ? [
            // EmissionTons?.eD_Scope1_T,
            EmissionTons?.eD_Stationary_T,
            EmissionTons?.eD_Mobile_T,
            EmissionTons?.eD_Refrigerants_T,
            EmissionTons?.eD_Biogenic_T,
          ]
        : [
            // EmissionPercentage?.eD_Scope1_P,
            EmissionPercentage?.eD_Stationary_P,
            EmissionPercentage?.eD_Mobile_P,
            EmissionPercentage?.eD_Refrigerants_P,
            EmissionPercentage?.eD_Biogenic_P,
          ],
        backgroundColor: ['#97C2F6', '#B0D4FF', '#C6E0FF'],
        borderColor: '#FFFFFF',
        borderWidth: 1,
    },
    ],
  };

  const doughnutData2 = {
      labels: ['Location Base...', 'Market Base E...', 'Heat and stre...'],
      datasets: [
      {
          label: 'Dataset 2',
          data: unit === 'T'
          ? [
              EmissionTons?.eD_Location_T,
              EmissionTons?.eD_Market_T,
              EmissionTons?.eD_Heat_T
            ]
          : [
              EmissionPercentage?.eD_Location_P,
              EmissionPercentage?.eD_Market_P,
              EmissionPercentage?.eD_Heat_P
          ],
          backgroundColor: ['#0065FF', '#3883F6', '#5595F6'],
          borderColor: '#FFFFFF',
          borderWidth: 1,
      },
      ],
  };

  const doughnutData3 = {
      labels: ['Transport an...', 'Business Tra...', 'Employee C...', 'Biogenic'],
      datasets: [
      {
          label: 'Dataset 3',
          data: unit === 'T'
          ? [
              EmissionTons?.eD_Transport_T,
              EmissionTons?.eD_Business_T,
              EmissionTons?.eD_Employee_T,
              EmissionTons?.eD_Biogenic2_T
            ]
          : [
              EmissionPercentage?.eD_Transport_P,
              EmissionPercentage?.eD_Business_P,
              EmissionPercentage?.eD_Employee_P,
              EmissionPercentage?.eD_Biogenic2_P
            ],
          backgroundColor: ['#848689', '#03133A', '#4D5360'],
          borderColor: '#FFFFFF',
          borderWidth: 1,
      },
      ],
  };

  const legendData = [
    [
      { color: '#97C2F6', label: 'Stationary', value: unit === 'T' ? EmissionTons?.eD_Stationary_T : EmissionPercentage?.eD_Stationary_P },
      { color: '#B0D4FF', label: 'Mobile', value: unit === 'T' ? EmissionTons?.eD_Mobile_T : EmissionPercentage?.eD_Mobile_P },
      { color: '#C6E0FF', label: 'Refrigerants', value: unit === 'T' ? EmissionTons?.eD_Refrigerants_T : EmissionPercentage?.eD_Refrigerants_P },
      { color: '#B0D4FF80', label: 'Biogenic', value: unit === 'T' ? EmissionTons?.eD_Biogenic_T : EmissionPercentage?.eD_Biogenic_P },
    ],
    [
      { color: '#0065FF', label: 'Location Base...', value: unit === 'T' ? EmissionTons?.eD_Location_T : EmissionPercentage?.eD_Location_P },
      { color: '#3883F6', label: 'Market Base E...', value: unit === 'T' ? EmissionTons?.eD_Market_T : EmissionPercentage?.eD_Market_P },
      { color: '#0065FFBF', label: 'Heat and stre...', value: unit === 'T' ? EmissionTons?.eD_Heat_T : EmissionPercentage?.eD_Heat_P },
    ],
    [
      { color: '#03133A', label: 'Transport an...', value: unit === 'T' ? EmissionTons?.eD_Transport_T : EmissionPercentage?.eD_Transport_P },
      { color: '#4D5360', label: 'Business Tra...', value: unit === 'T' ? EmissionTons?.eD_Business_T : EmissionPercentage?.eD_Business_P },
      { color: '#848689', label: 'Employee C...', value: unit === 'T' ? EmissionTons?.eD_Employee_T : EmissionPercentage?.eD_Employee_P },
      { color: '#03133A80', label: 'Biogenic', value: unit === 'T' ? EmissionTons?.eD_Biogenic2_T : EmissionPercentage?.eD_Biogenic2_P },
    ],
  ];

  return (
    <div className="mx-auto rounded-[8px] shadow-custom md:p-6 p-4 md:max-h-[450px] w-full">
      <div className='mb-2 flex items-start justify-between gap-2'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-2xl font-bold text-neutral-800'>Emission Distribution</h2>
          {/* <p className='text-neutral-400 text-sm'>as of 23 Nov 2022, 09:41 PM</p> */}
        </div>
        <div className='bg-bgContent flex flex-col rounded-[8px]'>
          <button 
            className={`w-8 h-8 ${unit === 'P' && 'border-bgContent'} ${unit === 'T' && 'bg-white border-[1px] rounded-[8px] border-[#0065ff]'}`}
            onClick={() => setUnit('T')}
            >
            <p className={`${unit !== 'P' && 'gradient-unit'} text-white text-lg text-center font-bold`}>T</p>
          </button>
          <button 
            className={`w-8 h-8 ${unit === 'T' && 'border-bgContent'} ${unit === 'P' && 'bg-white border-[1px] rounded-[8px] border-[#0065ff]'}`}
            onClick={() => setUnit('P')}
            >
            <p className={`${unit !== 'T' && 'gradient-unit'}  text-white text-lg text-center font-bold`}>%</p>
          </button>
        </div>
      </div>

      <div className='flex md:gap-2 gap-8 items-center justify-between flex-wrap md:flex-nowrap'>
        {[doughnutData1, doughnutData2, doughnutData3].map((data, index) => {
          // Construye el nombre de la propiedad dinámicamente
          const scopeLabel = unit === 'T'
            ? `eD_Scope${index + 1}_T`
            : `eD_Scope${index + 1}_P`;

          return (
            <div className="md:w-[180px] w-full md:h-[150px] h-full flex flex-col items-center relative" key={index}>
              <Doughnut data={data} options={options2} />
              <div className='absolute top-0 md:mt-12 mt-28 right-0 left-0 text-center'>
                <p className='text-content font-light md:text-sm text-3xl'>Scope {index + 1}</p>
                <span className='font-bold text-dark-200 text-4xl md:text-base'>
                  {unit === 'T'
                    ? EmissionTons?.[scopeLabel as keyof EmissionTonsProps] 
                    : EmissionPercentage?.[scopeLabel as keyof EmissionPercentageProps]
                  } {unit === 'T' ? 'T' : '%'}
                </span>
              </div>
              <div className='mt-6 flex flex-col gap-2'>
                {legendData[index].map((legend, i) => (
                  <div key={i} className='flex items-center gap-4 justify-between text-neutral-600 text-sm'>
                    <div className='flex items-center gap-2'>
                      <div style={{ backgroundColor: legend.color }} className='w-3 h-3 rounded-full'></div>
                      <p className='text-sm text-content font-light'>{legend.label}</p>
                    </div>
                    <p className='text-content'>{legend.value} {unit === 'T' ? 'T' : '%'}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default CircleChart