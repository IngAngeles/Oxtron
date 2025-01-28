"use client";
import CarbonChart from '@/components/charts/carbonChart'
import DataStats from '@/components/charts/dataStats'
import InformationTable from '@/components/charts/informationTable'
import ParticularChart from '@/components/charts/particularChart'
import TitleHandler from '@/components/TitleHandler'
import React, { useEffect, useState } from 'react'
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";
import Loading from '@/components/loading/LoadingBlack';

const Capture = () => {
  const pathname = usePathname();
  const lang: Locale = (pathname?.split("/")[1] as Locale) || "en";
  const [loading, setLoading] = useState(true);
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        setLoading(true);
        const dict = await getDictionary(lang);
        setDictionary(dict.pages.capture);
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

  return (
    <div className='min-h-screen overflow-hidden p-6 lg:ml-[205px] ml-0'>
      <TitleHandler title={dictionary.title} text={dictionary.subtitle} />
      <div className='mt-4 flex flex-col lg:flex-row lg:gap-10 gap-4 justify-between flex-wrap'>
        <DataStats name={dictionary.produced} stats={449} unit="Tons"  />
        <DataStats name={dictionary.captured} stats={265} unit="Tons"  />
        <DataStats name={dictionary.impact} stats={6} unit="Tons"  />
        <DataStats name={dictionary.progress} stats={44} unit="%"  />
      </div>
      <div className='flex flex-col lg:flex-row gap-8 mt-7'>
        {/* Contenedor para CarbonChart y ParticularChart */}
        <div className='flex flex-col gap-8 flex-1'>
          <CarbonChart />
          <ParticularChart />
        </div>
        {/* Contenedor para InformationTable */}
        <div className='lg:w-1/4 mt-7 lg:mt-0 flex'>
          <InformationTable />
        </div>
      </div>
    </div>
  )
} 
 
export default Capture