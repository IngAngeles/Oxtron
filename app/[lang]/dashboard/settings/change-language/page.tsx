'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import TitleHandler from '@/components/TitleHandler';
import { getDictionary } from "@/lib/dictionary";
import Loading from '@/components/loading/LoadingBlack';
import { Locale } from '@/i18n.config';
import LocalSwitcher from '@/components/lang/locale-switcher';

const Change = () => {
  const [loading, setLoading] = useState(true);
  const [dictionary, setDictionary] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);  // Estado para verificar si el componente se ha montado
  const router = useRouter();
  const pathname = usePathname();
  const lang = (pathname?.split("/")[1] as Locale) || "en";

  useEffect(() => {
    setIsMounted(true);  // Solo después de que el componente se monte en el cliente

    const loadDictionary = async () => {
      try {
        setLoading(true);
        const dict = await getDictionary(lang);
        setDictionary(dict.pages.settings.change);
      } catch (error) {
        console.error("Error loading dictionary:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDictionary();
  }, [lang]);

  // Asegúrate de que el componente solo se renderiza cuando ya se haya montado
  if (!isMounted) {
    return null;
  }

  if (loading || !dictionary) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className='p-6 ml-0 mt-6 lg:ml-64'>
      <div className='flex items-center mb-4 gap-2'>
        <button onClick={() => router.back()} className='flex items-center gap-2 text-blue-600 hover:text-blue-800'>
          <ArrowLeft className='w-6 h-6' /> 
        </button>
        <TitleHandler title={dictionary.title} text={dictionary.subtitle} />
      </div>
      <LocalSwitcher />
    </div>
  );
};

export default Change;
