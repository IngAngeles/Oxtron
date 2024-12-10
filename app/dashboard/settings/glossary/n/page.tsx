"use client"
import TitleHandler from '@/components/TitleHandler';
import React from 'react';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const glossaryItems = [
    { term: 'Net Zero: Net Zero', 
        definition: 'Refers to the balance between the amount of greenhouse gas emissions entering the atmosphere and the amount of greenhouse gas emissions removed from the atmosphere, either by capture or reduction of emissions elsewhere. The term net zero has become popular with "net zero targets," an increasingly popular corporate scheme for climate targets.' },
    { term: 'Non-renewable Energy', 
        definition: 'Energy derived from limited resources. Traditionally, non-renewable energies come from fossil fuels like gas, oil, or coal, which have supported economic progress since the industrial revolution. Nuclear energy is often considered non-renewable, but uranium deposits are thought to provide nuclear energy until the sun burns out.' },
    
    ];

const N = () => {
    const pathname = usePathname()

    return (
        <div className='min-h-screen flex flex-col justify-between ml-0 p-6 lg:ml-64'>
            <div>
                <div className='flex items-center mb-4 gap-2'>
                    <button onClick={() => window.history.back()} className='flex items-center gap-2 text-blue-600 hover:text-blue-800'>
                        <ArrowLeft className='w-6 h-6' /> 
                    </button>
                    <TitleHandler title="Glossary" text='N' />
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

export default N;
