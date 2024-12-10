"use client"

import { EnvironmentalTableProps } from '@/constants/types';
import React from 'react';

const EnvironmentalTable: React.FC<EnvironmentalTableProps> = ({ data }) => {
  return (
    <div className='flex-1 shadow-custom rounded-[8px] w-full p-3 md:p-6'>
        <h2 className='text-2xl font-bold text-neutral-800'>
          Environmental Impact per Facility
        </h2>
        {/* <p className='text-neutral-400 text-sm'>
          as of 23 Nov 2022, 09:41 PM
        </p> */}

        <div className="mx-auto max-w-4xl mt-5">
          <div className="grid md:grid-cols-6 grid-cols-3 font-sans text-content text-center gap-y-3">
            <div className="font-semibold text-left border-b-[1px] border-content">Facility ID</div>
            <div className="font-semibold border-b-[1px] border-content md:block hidden">Scope 1</div>
            <div className="font-semibold border-b-[1px] border-content md:block hidden">Scope 2</div>
            <div className="font-semibold border-b-[1px] border-content md:block hidden">Scope 3</div>
            <div className="font-semibold border-b-[1px] border-content">Total CO2e</div>
            <div className="font-semibold border-b-[1px] border-content">Progress</div>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <div key={`id-${index}`} className="py-2 text-left border-b-[1px] border-content border-opacity-25 pb-4">{item.id}</div>
                <div key={`scope1-${index}`} className="py-2 border-b-[1px] border-content border-opacity-25 md:block hidden">{item.alcance1}</div>
                <div key={`scope2-${index}`} className="py-2 border-b-[1px] border-content border-opacity-25 md:block hidden">{item.alcance2}</div>
                <div key={`scope3-${index}`} className="py-2 border-b-[1px] border-content border-opacity-25 md:block hidden">{item.alcance3}</div>
                <div key={`total-${index}`} className="py-2 border-b-[1px] border-content border-opacity-25">{item.totalCO2e}</div>
                <div key={`progress-${index}`} className="py-2 border-b-[1px] border-content border-opacity-25">{item.progreso}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
    </div>
  );
};

export default EnvironmentalTable;
