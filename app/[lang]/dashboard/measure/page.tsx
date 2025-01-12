"use client";
import TitleHandler from "@/components/TitleHandler";
import TabMenu from "@/components/measure/TabMenu";
import Loading from "@/components/loading/LoadingBlack";
import {useDictionary} from "@/hooks/shared/useDictionary";

declare global {
  type Cards = {
    id: string | number
    title?: string
    lastUpdated: Date | string
    description: string
    icon: {
      src: string
      position?: 'head' | 'body'
      onClick?: () => void
    }
    footerCard?: {
      scope: string[]
    }
    link?: string
    onClick?: () => void
  }

  type Option = {
    value: string;
    label: string;
  }
}

export default function Measure() {
  const {isLoading, dictionary} = useDictionary();
  const items: string[] = dictionary?.measure.bar || [];

  return (isLoading || !dictionary) ? (
    <div className="flex items-center justify-center w-full h-full">
      <Loading/>
    </div>
  ) : (
    <div className="flex flex-col gap-4 lg:ml-64 p-6 ml-0">
      <TitleHandler title={dictionary?.measure.title} text={dictionary?.measure.subtitle}/>
      <TabMenu items={items} cards={dictionary?.measure.cards}/>
    </div>
  );
}
