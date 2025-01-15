'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import Loading from "@/components/loading/LoadingBlack";
import {HistoricalCard} from "@/components/measure/historical/HistoricalCard";
import {SimpleTable} from "@/components/shared/SimpleTable";
import {useDictionary} from "@/hooks/shared/useDictionary";
import {useEffect, useState} from "react";
import {useModal} from "@/hooks/shared/useModal";
import {getVehicleDetails} from "@/actions/measure/details";
import Modal from "@/components/measure/Modal";
import {VehicleDetails} from "@/lib/validation";
import {VehiclesInvoiceForm} from "@/components/forms/measure/Details/VehiclesInvoiceForm";

type Props = { params: { id: number } };

export default function VehiclesDetailPage({ params: { id } }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedRow, _setSelectedRow] = useState<any>(null)
  const {showModal, handleHideModal, handleShowModal} = useModal()
  const {dictionary} = useDictionary();
  const [data, setData] = useState<Array<any>>([])
  const path = usePathname();

  const reloadData = async () => {
    setIsLoading(true)

    async function getData(id: number) {
      const vehicles = await getVehicleDetails(id)
      return vehicles.data
    }

    const newData = await getData(id)

    // @ts-ignore
    setData(newData || [])
    console.log(data)
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    reloadData()
  }, [id])

  const columns = [
    {header: dictionary?.measure.table.vehicles.type, accessor: 'idEmissionFactorDescription'},
    {header: dictionary?.measure.table.vehicles.sou, accessor: 'cboTypeDescription'},
    {header: dictionary?.measure.table.vehicles.amo, accessor: 'amount'},
    {header: dictionary?.measure.table.vehicles.unit, accessor: 'unit'},
    {header: dictionary?.measure.table.vehicles.start, accessor: 'startDate'},
    {header: dictionary?.measure.table.vehicles.end, accessor: 'endDate'},
    {header: dictionary?.measure.table.vehicles.up, accessor: 'firstName'},
    // { header: 'Status', accessor: 'active' },
  ]

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
        <HistoricalCard onClick={handleShowModal} registryCount={data.length} title="">
          {isLoading ?
            <Loading/> :
            <SimpleTable columns={columns} data={data}/>
          }
        </HistoricalCard>
      </div>
      {showModal && (
        <Modal
          handleOnCloseModal={handleHideModal}
          title="Create an invoice manually"
          className="h-auto min-w-full lg:min-w-[70vw] xl:min-w-[700px] 2xl:min-w-[1000px]"
        >
          <VehiclesInvoiceForm
            idControlVehicle={id}
            // @ts-ignore
            vehicle={selectedRow as VehicleDetails}
            reloadData={reloadData}/>
        </Modal>
      )}
    </>
  )
}
