"use client"
import TitleHandler from '@/components/TitleHandler';
import React from 'react';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const glossaryItems = [
    { term: 'Global Warming', 
        definition: 'Process of increasing Earth is temperature, causing sea levels to rise, increasing the frequency of natural phenomena, expanding desert areas, and causing changes in biodiversity. Global warming can be of natural or anthropogenic origin and is caused by the increase in greenhouse gases.' },
    { term: 'Greenhouse Gas Emissions (GHG)', 
        definition: 'As the Sun heats the Earth, the surface releases heat into space as infrared radiation. Greenhouse gases absorb this radiation, which in turn warms the atmosphere, creating a greenhouse effect. Since the industrial revolution, the amount of greenhouse gases released into the atmosphere has increased due to human activities. Higher concentrations of greenhouse gases mean an intensification of the greenhouse effect, leading to greater warming of the planet. Common greenhouse gases include carbon dioxide (CO2), methane (CH4), and nitrous oxide (N2O), as well as synthetically produced gases like fluorinated ethers, hydrofluorocarbons (HFCs), perfluorocarbons (PFCs), and others. The greenhouse effect of a specific gas depends on three factors: concentration, longevity, and potency.' },
    ];

const G = () => {
    const pathname = usePathname()

    return (
        <div className='min-h-screen flex flex-col justify-between ml-0 p-6 lg:ml-64'>
            <div>
                <div className='flex items-center mb-4 gap-2'>
                    <button onClick={() => window.history.back()} className='flex items-center gap-2 text-blue-600 hover:text-blue-800'>
                        <ArrowLeft className='w-6 h-6' /> 
                    </button>
                    <TitleHandler title="Glossary" text='G' />
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

export default G;
