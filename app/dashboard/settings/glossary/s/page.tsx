"use client"
import TitleHandler from '@/components/TitleHandler';
import React from 'react';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const glossaryItems = [
    { term: 'Sequestration of Carbon', 
        definition: 'Carbon sequestration refers to the process of capturing and storing carbon dioxide (CO2) from the atmosphere or industrial sources before it is released into the atmosphere. This process helps reduce the amount of CO2 in the atmosphere, potentially mitigating climate change and its adverse effects. Carbon sequestration can occur naturally, such as when plants absorb CO2 during photosynthesis and store it as biomass, or it can be human-induced, through technologies like carbon capture and storage (CCS) in industrial facilities or promoting agricultural practices that enhance carbon capture in soil.' },
    { term: 'Scopes 1, 2, and 3', 
        definition: 'Greenhouse gas emissions from organisations are divided into Scopes 1, 2, and 3 by the Greenhouse Gas Protocol, an accounting tool. Scope 1 covers direct emissions that an organisation controls, owns, and produces. Scope 2 represents emissions from energy used in a company is direct operations, such as purchased electricity, heating, or cooling. Scope 3 includes emissions associated with a company is operations and supply chain that are beyond its control, such as supplier emissions.' },
    { term: 'Science-Based Targets', 
        definition: 'Science-Based Targets are a framework for setting climate goals developed by the Science Based Targets Initiative (SBTi), which supports companies in setting emission reduction targets in line with the Paris Agreement. SBTi is a collaboration between the Carbon Disclosure Project (CDP), the World Resources Institute (WRI), the United Nations Global Compact, and the World Wildlife Fund (WWF) and is often the verifier of corporate net-zero targets.' },
    { term: 'Sustainability', 
        definition: 'The ability to maintain or preserve something over time, especially in relation to the environment, natural resources, and economic and social practices, so that current needs are met without compromising the ability of future generations to meet their own needs.' },
    { term: 'Sustainable Forest', 
        definition: 'Forests managed to provide resources while conserving their properties over time. Thus, a sustainable forest maintains biodiversity and allows for regeneration. Its benefits are economic, social, and environmental.' },
    
    ];

const S = () => {
    const pathname = usePathname()

    return (
        <div className='min-h-screen flex flex-col justify-between ml-0 p-6 lg:ml-64'>
            <div>
                <div className='flex items-center mb-4 gap-2'>
                    <button onClick={() => window.history.back()} className='flex items-center gap-2 text-blue-600 hover:text-blue-800'>
                        <ArrowLeft className='w-6 h-6' /> 
                    </button>
                    <TitleHandler title="Glossary" text='S' />
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

export default S;
