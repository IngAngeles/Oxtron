"use client"
import TitleHandler from '@/components/TitleHandler';
import React from 'react';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const glossaryItems = [
    { term: 'Lifecycle Assessment (LCA)', 
        definition: 'Lifecycle Assessment or Life Cycle Analysis (LCA) is the study that measures the environmental impact of a product, process, or service throughout its production and existence. LCAs are useful for identifying the sources of greenhouse gas emissions at any stage and understanding the climate impact of a product.' },
    { term: 'Limestone', 
        definition: 'Limestone is a soil conditioner with a high pH used in agriculture to reduce soil acidity. Limestone also increases calcium and magnesium concentration, promoting plant growth and higher yields. Limestone contains carbon, and after decomposition, it releases carbon dioxide, increasing its concentration in the atmosphere.' },
    
    ];

const L = () => {
    const pathname = usePathname()

    return (
        <div className='min-h-screen flex flex-col justify-between ml-0 p-6 lg:ml-64'>
            <div>
                <div className='flex items-center mb-4 gap-2'>
                    <button onClick={() => window.history.back()} className='flex items-center gap-2 text-blue-600 hover:text-blue-800'>
                        <ArrowLeft className='w-6 h-6' /> 
                    </button>
                    <TitleHandler title="Glossary" text='L' />
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

export default L;
