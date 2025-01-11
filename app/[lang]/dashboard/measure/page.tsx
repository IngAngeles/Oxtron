"use client";
import { useEffect, useState } from "react";
import TitleHandler from "@/components/TitleHandler";
import TabMenu from "@/components/measure/TabMenu";
import Loading from "@/components/loading/LoadingBlack";
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";

export default function Measure() {
  const pathname = usePathname();
  const lang: Locale = (pathname?.split("/")[1] as Locale) || "en";

  const [dictionary, setDictionary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(lang);
      setDictionary(dict.pages.measure);
      setIsLoading(false);

      console.log(dictionary)
    };

    loadDictionary();
  }, [lang]);

  const items: string[] = dictionary?.bar || [];

  return (isLoading || !dictionary)  ? (
    <div className="flex items-center justify-center w-full h-full">
      <Loading />
    </div>
  ) : (
    <div className="flex flex-col gap-4 lg:ml-64 p-6 ml-0">
      <TitleHandler title={dictionary.title} text={dictionary.subtitle} />
      <TabMenu items={items} cards={dictionary.cards} />
    </div>
  );
}
