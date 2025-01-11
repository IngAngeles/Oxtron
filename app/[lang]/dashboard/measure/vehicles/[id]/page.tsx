'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import Loading from "@/components/loading/LoadingBlack";
import {HistoricalCard} from "@/components/measure/historical/HistoricalCard";
import {SimpleTable} from "@/components/shared/SimpleTable";
import {useDictionary} from "@/hooks/shared/useDictionary";

type Props = { params: { id: number } };

export default function VehiclesDetailPage({ params: { id } }: Props) {
  const {isLoading, dictionary} = useDictionary();
  const path = usePathname();

  return (isLoading || !dictionary) ? (
    <div className="flex items-center justify-center w-full h-full">
      <Loading/>
    </div>
  ) : (
    <>
      <div className="flex flex-col  gap-4 p-6 lg:ml-64 ml-0">
        <div>
          <h1 className="title-geometos font-[400] text-2xl text-neutral-900">
            <Link
              href={path.split('/').slice(0, -1).join('/').replace('vehicles', '')}
              className="text-neutral-300"
            >
              {dictionary?.measure.title}
            </Link> /

            <Link
              href={path.split('/').slice(0, -1).join('/')}
              className="text-neutral-300"
            >
              {dictionary?.measure.all.vehicles}
            </Link>
            {' '} / {id}
          </h1>
          <p className="font-light text-neutral-500">
            {dictionary?.measure.subtitle}
          </p>
        </div>
        <HistoricalCard onClick={() => {}} registryCount={3}>
          {isLoading ?
            <Loading/> :
            <SimpleTable columns={[]} data={[]}/>
          }
        </HistoricalCard>
      </div>
    </>
  )
}
