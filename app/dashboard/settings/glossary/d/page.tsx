"use client"
import TitleHandler from '@/components/TitleHandler';
import React from 'react';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const glossaryItems = [
    { term: 'Deforestation', 
        definition: 'Deforestation is the practice of clearing forested areas intentionally to use the land and/or resources for human activities. Deforestation has many negative effects on biodiversity, soil erosion, the water cycle, and prominently on the climate.' },
    { term: 'Direct European Directive', 
        definition: 'A tool from the European Parliament to require member states to meet a goal within a specified timeframe (defines the “what”). For example, net-zero industry by 2050.' },
    { term: 'Direct Emissions of N2O (Nitrous Oxide)', 
        definition: 'Direct emissions of N2O come directly from nitrogen in the soil, originating from manure, fertilisers, and crop residues. N2O is formed by soil bacteria in the presence of oxygen.' },
];

const D = () => {
    const pathname = usePathname()

    return (
        <div className='min-h-screen flex flex-col justify-between ml-0 p-6 lg:ml-64'>
            <div>
                <div className='flex items-center mb-4 gap-2'>
                    <button onClick={() => window.history.back()} className='flex items-center gap-2 text-blue-600 hover:text-blue-800'>
                        <ArrowLeft className='w-6 h-6' /> 
                    </button>
                    <TitleHandler title="Glossary" text='D' />
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

export default D;
