"use client";
import 'chart.js/auto';
import { CheckIcon } from 'lucide-react'; 

const InformationTable = () => {
  return (
    <div className='rounded-[8px] shadow-custom md:p-6 p-3 w-full'>
      <h2 className='text-xl font-bold text-neutral-800 text-center mb-6'>
        System&apos;s Information
      </h2>

      <div className='flex flex-col'>
        {/* Cuadro 1 */} 
        <div className='bg-[#F4F4F4] p-4 rounded-[8px]  flex items-center gap-4 mb-6'>
          <div className='flex flex-col flex-1 text-center'>
            <p className='text-neutral-400 text-sm'>Temperature</p>
            <h2 className='text-xl font-bold text-neutral-800'>35<span className='text-black text-sm font-normal'>°C</span></h2>
          </div>
          <div className='w-8 h-8 flex items-center justify-center border-2 rounded-[8px] border-[#136AF6]'>
            <div className='w-6 h-6 flex items-center justify-center bg-transparent'>
              <CheckIcon className='w-4 h-4 text-[#136AF6]' />
            </div>
          </div>
        </div>
        {/* Cuadro 2 */}
        <div className='bg-[#F4F4F4] p-4 rounded-[8px]  flex items-center gap-4 mb-6'>
          <div className='flex flex-col flex-1 text-center'>
            <p className='text-neutral-400 text-sm'>Humidity</p>
            <h2 className='text-xl font-bold text-neutral-800'>24<span className='text-black text-sm font-normal'>%</span></h2>
          </div>
          <div className='w-8 h-8 flex items-center justify-center border-2 rounded-[8px] border-[#136AF6]'>
            <div className='w-6 h-6 flex items-center justify-center bg-transparent'>
              <CheckIcon className='w-4 h-4 text-[#136AF6]' />
            </div>
          </div>
        </div>
        {/* Cuadro 3 */}
        <div className='bg-[#F4F4F4] p-4 rounded-[8px]  flex items-center gap-4 mb-6'>
          <div className='flex flex-col flex-1 text-center'>
            <p className='text-neutral-400 text-sm'>Pressure</p>
            <h2 className='text-xl font-bold text-neutral-800'>1000<span className='text-black text-sm font-normal'>hPa</span></h2>
          </div>
          <div className='w-8 h-8 flex items-center justify-center border-2 rounded-[8px] border-[#136AF6]'>
            <div className='w-6 h-6 flex items-center justify-center bg-transparent'>
              <CheckIcon className='w-4 h-4 text-[#136AF6]' />
            </div>
          </div>
        </div>
        {/* Cuadro 4 */}
        <div className='bg-[#F4F4F4] p-4 rounded-[8px]  flex items-center gap-4 mb-6'>
          <div className='flex flex-col flex-1 text-center'>
            <p className='text-neutral-400 text-sm'>Water</p>
            <h2 className='text-xl font-bold text-neutral-800'>20<span className='text-black text-sm font-normal'>L</span></h2>
          </div>
          <div className='w-8 h-8 flex items-center justify-center border-2 rounded-[8px] border-[#136AF6]'>
            <div className='w-6 h-6 flex items-center justify-center bg-transparent'>
              <CheckIcon className='w-4 h-4 text-[#136AF6]' />
            </div>
          </div>
        </div>
        {/* Cuadro 5 */}
        <div className='bg-[#F4F4F4] p-4 rounded-[8px]  flex items-center gap-4 mb-6'>
          <div className='flex flex-col flex-1 text-center'>
            <p className='text-neutral-400 text-sm'>Chemical Tank</p>
            <h2 className='text-xl font-bold text-neutral-800'>20<span className='text-black text-sm font-normal'>L</span></h2>
          </div>
          <div className='w-8 h-8 flex items-center justify-center border-2 rounded-[8px] border-[#136AF6]'>
            <div className='w-6 h-6 flex items-center justify-center bg-transparent'>
              <CheckIcon className='w-4 h-4 text-[#136AF6]' />
            </div>
          </div>
        </div>
        {/* Cuadro 6 */}
        <div className='bg-[#F4F4F4] p-4 rounded-[8px]  flex items-center gap-4 mb-6'>
          <div className='flex flex-col flex-1 text-center'>
            <p className='text-neutral-400 text-sm'>Gypsum Produced</p>
            <h2 className='text-xl font-bold text-neutral-800'>15<span className='text-black text-sm font-normal'>kg</span></h2>
          </div>
          <div className='w-8 h-8 flex items-center justify-center border-2 rounded-[8px] border-[#136AF6]'>
            <div className='w-6 h-6 flex items-center justify-center bg-transparent'>
              <CheckIcon className='w-4 h-4 text-[#136AF6]' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationTable;
