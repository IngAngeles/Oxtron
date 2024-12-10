"use client"
import TitleHandler from '@/components/TitleHandler';
import React from 'react';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const glossaryItems = [
    { term: 'Paris Agreement', 
        definition: 'An international treaty signed by 196 countries at the 2015 United Nations Climate Change Conference, aiming to keep the global temperature increase below 2°C, preferably 1.5°C, above pre-industrial levels. The global emission targets set for this goal are a net-zero economy by 2050 and a 50% reduction in greenhouse gas emissions by 2030. The net-zero targets are derived as a commitment of the entity to achieve this goal.' },
    { term: 'Product Lifespan (Cradle to Grave / Cradle to Shelf)', 
        definition: 'The period spanning from raw material extraction to the final disposal of the product or its arrival at the shelf for consumer sale. This approach considers all stages of the product lifecycle, from creation to disposal, including manufacturing, distribution, use, and final disposal.' },
    
    ];

const P = () => {
    const pathname = usePathname()

    return (
        <div className='min-h-screen flex flex-col justify-between ml-0 p-6 lg:ml-64'>
            <div>
                <div className='flex items-center mb-4 gap-2'>
                    <button onClick={() => window.history.back()} className='flex items-center gap-2 text-blue-600 hover:text-blue-800'>
                        <ArrowLeft className='w-6 h-6' /> 
                    </button>
                    <TitleHandler title="Glossary" text='P' />
                </div>
                <div className='flex gap-10 flex-wrap mt-4 h-full w-full pb-9 flex-col lg:flex-row'>

                    {glossaryItems.map((item, index) => (
                        <div key={index} className='relative bg-white shadow-xl px-7 py-5 rounded-xl w-[350px] flex-grow'>
                            <div className='flex flex-col mb-5'>
                                <h1 className='font-bold text-neutral-700 text-2xl Geometos'>{item.term}</h1>
                                <p className='text-neutral-600 mt-2'>{item.definition}</p>
                            </div>
                            <div className='border-t border-gray-300 mt-4'></div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default P;
