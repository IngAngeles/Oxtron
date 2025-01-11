'use client'
import {useEffect, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Loading from "@/components/loading/LoadingBlack";
import TabMenu from "@/components/measure/TabMenu";
import {useDictionary} from "@/hooks/shared/useDictionary";
import {useFacilityStore} from "@/store/measure/facilities";
import {Facility} from "@/lib/validation";

export default function FacilitiesPage() {
  const {isLoading, dictionary} = useDictionary()
  const {loading, facilities, fetchFacilities, setError, setLoading} = useFacilityStore()
  const [cards, setCards] = useState<Cards[]>([])
  const path = usePathname()

  const items: string[] = [dictionary?.measure.bar[0]]

  const buttons: IIconButton[] = [
    {
      src: '/assets/icons/black/Search.png',
      alt: 'Search icon',
      size: 'xs',
      text: dictionary?.measure.search,
      onClick: () => {
      },
    },
    {
      src: '/assets/icons/black/Add New-1.png',
      alt: 'Add icon',
      size: 'xs',
      text: dictionary?.measure.add,
      onClick: () => {
      },
    },
  ]

  useEffect(() => {
    fetchFacilities()
  }, [])

  useEffect(() => {
    setLoading(true)

    const cards: Cards[] = facilities.map((facility: Facility) => (
      {
        id: facility.idControlFacility || 0,
        title: facility?.idFacility,
        description: facility?.description || '',
        icon: {
          src: '/assets/icons/black/Edit.png',
          position: 'head',
          onClick: () => {
          },
        },
        link: `/${facility.idControlFacility}`,
        lastUpdated: new Date(2022, 10, 23),
      }
    ))
    setCards(cards)

    setLoading(false)
    setError('Test error')
  }, [facilities]);

  return (isLoading || loading || !dictionary) ? (
      <div className="flex items-center justify-center w-full h-full">
        <Loading/>
      </div>
    ) : (
      <>
        <div className="flex flex-col  gap-4 p-6 lg:ml-64 ml-0">
          <div>
            <h1 className="title-geometos font-[400] text-2xl text-neutral-900">
              <Link
                href={path.split('/').slice(0, -1).join('/')}
                className="text-neutral-300"
              >
                {dictionary?.measure.title}
              </Link> / {dictionary?.measure.all.facilities}
            </h1>
            <p className="font-light text-neutral-500">
              {dictionary?.measure.subtitle}
            </p>
          </div>
          <TabMenu items={items} cards={cards} iconButton={buttons}/>
        </div>
      </>
    )
}
