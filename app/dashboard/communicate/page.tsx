"use client"
import React, { useState } from 'react';
import DashboardButton from '@/components/DashboardButton';
// import Inbox from '@/components/Inbox';
import { CommunicateContext, ICommunicateContext } from '@/context/communicate'
import { EnvironmentalReport } from '@/components/communicate/EnvironmentalReport'
import { CreateReport } from '@/components/forms/communicate/CreateReport'
import dynamic from 'next/dynamic';

const TableField = dynamic(() => import('@/components/TableField'), { ssr: false });
const TitleHandler = dynamic(() => import('@/components/TitleHandler'), { ssr: false });

const Communicate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleShowCreateReportModal,  } = React.useContext(CommunicateContext) as ICommunicateContext

  return (
    <div className='min-h-screen p-6 lg:ml-64 flex flex-col'>
      <CreateReport/>
      <EnvironmentalReport/>
      <TitleHandler title="Communicate" text='Communicate the environmental impact of daily activities' />
      <div className='flex flex-1 gap-10 lg:flex-nowrap flex-wrap mt-4 w-full'>
        {/* Recent Reports */}
        <div className='bg-white shadow-custom w-full px-7 py-5 flex flex-col justify-between rounded-[8px]'>
          <div>
            <h2 className='font-bold text-neutral-700 text-x'>Recent Reports</h2>
            <TableField />
          </div>
          <DashboardButton
            isLoading={isLoading}
            className="bg-[#03133A] text-white w-auto mt-10 ml-0"
            style={{ padding: '8px 16px', width: 'auto', marginLeft: '0' }}
            onClick={ handleShowCreateReportModal }
          >
            Generate New Report
          </DashboardButton>
        </div>
        {/* <Inbox /> */}
      </div>
    </div>
  );
};

export default Communicate;
