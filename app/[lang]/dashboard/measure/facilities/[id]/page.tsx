'use client'
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import Loading from "@/components/loading/LoadingBlack";
import {HistoricalCard} from "@/components/measure/historical/HistoricalCard";
import {SimpleTable} from "@/components/shared/SimpleTable";
import {useDictionary} from "@/hooks/shared/useDictionary";
import {useFacilityStore} from "@/store/measure/facilities";
import {useEffect} from "react";

type Props = { params: { id: number } };

export default function FacilitiesDetailPage({params: {id}}: Props) {
  const {loading, facility, fetchFacilityById} = useFacilityStore()
  const {isLoading, dictionary} = useDictionary()
  const path = usePathname();
  const router = useRouter();
  const columns = [
    {header: dictionary?.measure.table.facilities.type, accessor: 'idTypeDetailsDescription'},
    {header: dictionary?.measure.table.facilities.sour, accessor: 'idTypeDescription'},
    {header: dictionary?.measure.table.facilities.amo, accessor: 'amount'},
    {header: dictionary?.measure.table.facilities.uni, accessor: 'unit'},
    {header: dictionary?.measure.table.facilities.start, accessor: 'startDate'},
    {header: dictionary?.measure.table.facilities.end, accessor: 'endDate'},
    {header: dictionary?.measure.table.facilities.up, accessor: 'firstName'},
    // { header: 'Status', accessor: 'active' },
  ]

  useEffect(() => {
    fetchFacilityById()
  }, []);

  return (isLoading || loading || !dictionary || !facility) ? (
    <div className="flex items-center justify-center w-full h-full">
      <Loading/>
    </div>
  ) : (
    <>
      <div className="flex flex-col  gap-4 p-6 lg:ml-64 ml-0">
        <div>
          <h1 className="title-geometos font-[400] text-2xl text-neutral-900">
            <Link
              href={path.split('/').slice(0, -1).join('/').replace('facilities', '')}
              className="text-neutral-300"
            >
              {dictionary?.measure.title}
            </Link> / {' '}

            <Link
              href={path.split('/').slice(0, -1).join('/')}
              className="text-neutral-300"
            >
              {dictionary?.measure.all.facilities}
            </Link>
            {' '} / {facility?.idFacility}
          </h1>
          <p className="font-light text-neutral-500">
            {dictionary?.measure.subtitle}
          </p>
        </div>
        <HistoricalCard title={facility?.idFacility} onClick={() => {
        }} registryCount={3}>
          {isLoading ?
            <Loading/> :
            <SimpleTable columns={columns} data={[]}/>
          }
        </HistoricalCard>
      </div>
    </>
  )
}
