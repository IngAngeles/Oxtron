"use client"
import { useState, useEffect } from 'react';
import { measureCards } from '@/constants/measure';
import dynamic from 'next/dynamic';

const TitleHandler = dynamic(() => import('@/components/TitleHandler'), { ssr: false });
const TabMenu = dynamic(() => import('@/components/measure/TabMenu'), { ssr: false });
const Loading = dynamic(() => import('@/components/loading/LoadingBlack'), { ssr: false });

const items: string[] = ['All', 'Scope 1', 'Scope 2', 'Scope 3'];

export default function Measure() {
  const [loading, setLoading] = useState(true); 
  const [_, setDataLoaded] = useState(false);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loading /> 
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:ml-64 p-6 ml-0">
      <TitleHandler title="Measure" text="Measure your company emissions and identify hotspots"/>
      <TabMenu items={items} cards={measureCards} appendTitle={ false} />
    </div>
  );
}
