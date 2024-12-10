"use client"

import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import TitleHandler from '@/components/TitleHandler';

const glossaryItems = [
    { term: 'Agreement 2030: United Nations 2030 Agenda', 
        definition: 'Plan to achieve a better and more sustainable future on a global scale. It created 17 Sustainable Development Goals (SDGs) as a guide for the 193 member countries to fight poverty and fairly distribute global resources. Since then, the 2030 Agenda for Sustainable Development has become the most comprehensive roadmap for how Earth is resources should be shared through a commitment to economic, environmental, and social sustainability.' },
    { term: 'Allocation', 
        definition: 'A standard method in life cycle assessment to divide the environmental impact of a process among the by-products. For example, a cow emits a certain amount of emissions throughout its life until it is slaughtered. At this point, several products will or have reached the shelf from that cow: ribs, filet mignon, ground beef, or milk, cheese, yogurt. The allocation approach determines how these emissions are distributed among all these products. There are three approaches to allocation: biophysical allocation, physical allocation, and economic allocation.' },
    { term: 'Analysis: Life Cycle Assessment (LCA)', 
        definition: 'Systematic evaluation of the environmental impacts of a product throughout its life cycle, from resource extraction to final disposal. With this analysis, we can study emissions throughout the value chain, such as extraction, production, and distribution (cradle-to-gate), or even extend the analysis to the end-use of the product, reuse, or recycling.' },
];

const A = () => {
    const pathname = usePathname(); 

    return (
        <div className='min-h-screen flex flex-col justify-between lg:ml-64 ml-0 p-6'>
            <div>
                <div className='flex items-center mb-4 gap-2'>
                    <button onClick={() => window.history.back()} className='flex items-center gap-2 text-blue-600 hover:text-blue-800'>
                        <ArrowLeft className='w-6 h-6' /> 
                    </button>
                    <TitleHandler title="Glossary" text='A' />
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

export default A;
