"use client";
import React, { useState, useEffect } from 'react';
import DashboardButton from '@/components/DashboardButton';
import TableField from '@/components/TableField';
import TitleHandler from '@/components/TitleHandler';
import { CommunicateContext, ICommunicateContext } from '@/context/communicate';
import { EnvironmentalReport } from '@/components/communicate/EnvironmentalReport';
import { CreateReport } from '@/components/forms/communicate/CreateReport';
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";
import Loading from '@/components/loading/LoadingBlack';

const Communicate = () => {
  const pathname = usePathname();
  const lang: Locale = (pathname?.split("/")[1] as Locale) || "en";
  const [loading, setLoading] = useState(true);
  const [dictionary, setDictionary] = useState<any>(null);
  const { handleShowCreateReportModal } = React.useContext(CommunicateContext) as ICommunicateContext;

  useEffect(() => {
    const loadDictionary = async () => {

      
      try {
        setLoading(true);
        const dict = await getDictionary(lang);
        setDictionary(dict.pages.communicate);
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
    <div className='min-h-screen p-6 lg:ml-64 flex flex-col'>
      <CreateReport />
      <EnvironmentalReport />
      <TitleHandler title={dictionary.title} text={dictionary.subtitle} />
      <div className='flex flex-1 gap-10 lg:flex-nowrap flex-wrap mt-4 w-full'>
        <div className='bg-white shadow-custom w-full px-7 py-5 flex flex-col justify-between rounded-[8px]'>
          <div>
            <h2 className='font-bold text-neutral-700 text-x'>{dictionary.recentReports}</h2>
            <TableField />
          </div>
          <DashboardButton
            isLoading={loading}
            className="bg-[#03133A] text-white w-auto mt-10 ml-0"
            style={{ padding: '8px 16px', width: 'auto', marginLeft: '0' }}
            onClick={handleShowCreateReportModal}
          >
            {dictionary.generateReportButton}
          </DashboardButton>
        </div>
      </div>
    </div>
  );
};

export default Communicate;
