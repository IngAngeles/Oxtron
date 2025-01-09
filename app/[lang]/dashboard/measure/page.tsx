"use client";
import { useState, useEffect } from 'react';
import TitleHandler from '@/components/TitleHandler';
import TabMenu from '@/components/measure/TabMenu';
import { measureCards } from '@/constants/measure';
import Loading from '@/components/loading/LoadingBlack';  
import { getDictionary } from "@/lib/dictionary";  
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";

export default function Measure() {
  const pathname = usePathname();
  const lang: Locale = (pathname?.split("/")[1] as Locale) || "en"; 
  const [loading, setLoading] = useState(true); 
  const [dictionary, setDictionary] = useState<any>(null); 
  const [, setDataLoaded] = useState(false); 

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDataLoaded(true);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(lang);
      setDictionary(dict.pages.measure); 
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

  const items: string[] = [dictionary.bar.option1, 'Scope 1', 'Scope 2', 'Scope 3'];

  return (
    <div className="flex flex-col gap-4 lg:ml-64 p-6 ml-0">
      <TitleHandler title={dictionary.title} text={dictionary.subtitle} />
      <TabMenu items={items} cards={measureCards} />
    </div>
  );
}
