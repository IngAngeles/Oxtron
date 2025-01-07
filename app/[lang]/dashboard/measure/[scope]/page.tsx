'use client'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import TabMenu from '@/components/measure/TabMenu'
import ModalMeasureForm from '@/components/measure/ModalMeasureForm'
import { MeasureContext } from '@/context/measure'
import { IMeasureContextType } from '@/constants/types'
import Loading from '@/components/loading/LoadingBlack'  
import { getDictionary } from "@/lib/dictionary";  
import { Locale } from "@/i18n.config";

export default function Page() {
  const {
    measure,
    setMeasure,
    scope,
    showModal,
    handleShowModal,
    handleHideModal,
    error,
    cards,
    title,
  } = useContext(MeasureContext) as IMeasureContextType

  const path = usePathname(); 
  const lang: Locale = (path?.split("/")[1] as Locale) || "en"; 
  const [loading, setLoading] = useState(true); 
  const [, setDataLoaded] = useState(false);  
  const [dictionary, setDictionary] = useState<any>(null); 

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

  if (error) {
    return (
      <div className="flex items-center justify-center mt-6 gap-4 md:ml-64 h-full">
        <p className="text-neutral-500">
          { error.toString() }
        </p>
      </div>
    )
  }

  const items: string[] = [dictionary.bar.option1]

  const buttons: IIconButton[] = [
    {
      src: '/assets/icons/black/Search.png',
      alt: 'Search icon',
      size: 'xs',
      text: dictionary.search,
      onClick: () => {
      },
    },
    {
      src: '/assets/icons/black/Add New-1.png',
      alt: 'Add icon',
      size: 'xs',
      text: dictionary.add,
      onClick: handleShowModal,
    },
  ]

  return (
    <>
      { showModal &&
        <ModalMeasureForm
          title={ title }
          scope={ scope }
          handleOnCloseModal={ () => {
            handleHideModal()
            setMeasure(undefined)
          } }
          measure={ measure }
        />
      }
      <div className="flex flex-col  gap-4 p-6 lg:ml-64 ml-0">
        <div>
          <h1 className="title-geometos font-[400] text-2xl text-neutral-900">
            <Link
              href={ path.split('/').slice(0, -1).join('/') }
              className="text-neutral-300"
            >
              {dictionary.title}
            </Link> / { scope }
          </h1>
          <p className="font-light text-neutral-500">
            {dictionary.subtitle}
          </p>
        </div>
        <TabMenu items={ items } cards={ cards } iconButton={ buttons }/>
      </div>
    </>
  )
}
