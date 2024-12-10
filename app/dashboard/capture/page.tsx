import CarbonChart from '@/components/charts/carbonChart'
import DataStats from '@/components/charts/dataStats'
import InformationTable from '@/components/charts/informationTable'
import ParticularChart from '@/components/charts/particularChart'
import TitleHandler from '@/components/TitleHandler'
import React from 'react'

const Capture = () => {
  return (
    <div className='p-6 lg:ml-64 ml-0'>
      <TitleHandler title="Capture" text='Discover the environmental impact of daily activities' />
      <div className='mt-4 flex flex-col lg:flex-row lg:gap-10 gap-4 justify-between flex-wrap'>
        <DataStats name="CO2 Emissions Produced" stats={449} unit="Tons"  />
        <DataStats name="CO2 Emissions Captured" stats={265} unit="Tons"  />
        <DataStats name="Impact Equivalence" stats={6} unit="Tons"  />
        <DataStats name="Progress" stats={44} unit="%"  />
      </div>
      <div className='flex flex-col lg:flex-row gap-8 mt-7 w-full'>
        {/* Contenedor para CarbonChart y ParticularChart */}
        <div className='w-full flex flex-col gap-8 flex-1'>
          <CarbonChart />
          <ParticularChart />
        </div>
        {/* Contenedor para InformationTable */}
        <div className='w-full lg:w-1/4 mt-7 lg:mt-0 flex'>
          <InformationTable />
        </div>
      </div>
    </div>
  )
} 
 
export default Capture