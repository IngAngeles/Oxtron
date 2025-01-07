"use client"
import TitleHandler from '@/components/TitleHandler';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";
import Loading from '@/components/loading/LoadingBlack';

const S = () => {
    const pathname = usePathname()
    const lang: Locale = (pathname?.split("/")[1] as Locale) || "en";
    const [loading, setLoading] = useState(true);
    const [dictionary, setDictionary] = useState<any>(null);

    useEffect(() => {
        const loadDictionary = async () => {
          try {
            setLoading(true);
            const dict = await getDictionary(lang);
            setDictionary(dict.pages.settings.glossary);
          } catch (error) {
            console.error("Error loading dictionary:", error);
          } finally {
            setLoading(false);
          }
        };
    
        loadDictionary();
      }, [lang]);
    
      if (loading || !dictionary) {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <Loading />
          </div>
        );
      }

    const glossaryItems = [
        { term: dictionary.s.seques, 
            definition: dictionary.s.definition1},
        { term: dictionary.s.scope, 
            definition: dictionary.s.definition2},
        { term: dictionary.s.science, 
            definition: dictionary.s.definition3},
        { term: dictionary.s.susta, 
            definition: dictionary.s.definition4},
        { term: dictionary.s.forest, 
            definition: dictionary.s.definition5},
        
    ];

    return (
        <div className='min-h-screen flex flex-col justify-between ml-0 p-6 lg:ml-64'>
            <div>
                <div className='flex items-center mb-4 gap-2'>
                    <button onClick={() => window.history.back()} className='flex items-center gap-2 text-blue-600 hover:text-blue-800'>
                        <ArrowLeft className='w-6 h-6' /> 
                    </button>
                    <TitleHandler title={dictionary.title} text='S' />
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
